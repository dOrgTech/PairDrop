import fs from "fs"
import Enumerable from "linq"
import path from "path"
import { fileURLToPath } from "url"
import { normalizeValueLogarithmic } from "./tools.js"

export default class DataMiner {
  localScoreData = []

  normalizeLocalScoreData(multiplier) {
    console.log("Log normalizing local score data...")

    if (this.localScoreData.length == 0) {
      console.log("Skipping normalization: no data")

      return
    }

    let minEntry = 1
    let maxEntry = Enumerable.from(this.localScoreData).max((x) => x.score) * 10

    let normalizedMin = 1
    let normalizedMax = 100

    for (let i = 0; i < this.localScoreData.length; i++)
      this.localScoreData[i].score =
        normalizeValueLogarithmic(
          this.localScoreData[i].score * 10,
          minEntry,
          maxEntry,
          normalizedMin,
          normalizedMax
        ) * multiplier
  }

  addScoreToLocalScoreData(address, score) {
    if (Enumerable.from(this.localScoreData).any((z) => z.address == address))
      Enumerable.from(this.localScoreData).first(
        (z) => z.address == address
      ).score += score
    else this.localScoreData.push({ address: address, score: score })
  }

  writeLocalScoreDataToFile(fileName) {
    const serializedData = JSON.stringify(this.localScoreData, null, 2)

    const __filename = fileURLToPath(import.meta.url)

    const __dirname = path.dirname(__filename)

    fs.writeFileSync(
      __dirname + `/dataMinersOutput/${fileName}.json`,
      serializedData
    )
  }

  mergeLocalScoreDataWithOverallScoreData(scoreData) {
    Enumerable.from(this.localScoreData).forEach((x) => {
      if (Enumerable.from(scoreData).any((z) => z.address == x.address))
        Enumerable.from(scoreData).first((z) => z.address == x.address).score +=
          x.score
      else scoreData.push({ address: x.address, score: x.score })
    })
  }

  normalizeData(rawDataFileName, multiplier) {
    const __filename = fileURLToPath(import.meta.url)

    const __dirname = path.dirname(__filename)

    this.localScoreData = JSON.parse(
      fs.readFileSync(__dirname + `/dataMinersOutput/${rawDataFileName}.json`)
    )

    this.normalizeLocalScoreData(multiplier)
  }

  static processData() {}
}
