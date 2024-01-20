import Enumerable from "linq"
import DataMiner from "./dataMiner.js"
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"

export default class DataMinerEAS extends DataMiner {
  async getData() {
    const __filename = fileURLToPath(import.meta.url)

    const __dirname = path.dirname(__filename)

    const rawData = JSON.parse(
      fs.readFileSync(__dirname + `/duneData/EASData.json`)
    )

    Enumerable.from(rawData.result.rows).forEach((x) => {
      let ownerAddress = x.recipient.toLowerCase()

      this.addScoreToLocalScoreData(ownerAddress, 1)
    })
  }

  static async processData(scoreData, multiplier, onlyNormalize = false) {
    console.log("Generating EAS data...")

    let dataMinerEAS = new DataMinerEAS()

    if (!onlyNormalize) {
      await dataMinerEAS.getData()

      dataMinerEAS.writeLocalScoreDataToFile(`${this.name}_raw`)
    }

    console.log("Normalizing EAS data...")

    await dataMinerEAS.normalizeData(`${this.name}_raw`, multiplier)

    dataMinerEAS.writeLocalScoreDataToFile(`${this.name}_normalized`)

    dataMinerEAS.mergeLocalScoreDataWithOverallScoreData(scoreData)
  }
}
