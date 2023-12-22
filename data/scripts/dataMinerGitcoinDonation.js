import Enumerable from "linq"
import DataMiner from "./dataMiner.js"
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"

export default class DataMinerGitcoinDonation extends DataMiner {
  async getData() {
    const __filename = fileURLToPath(import.meta.url)

    const __dirname = path.dirname(__filename)

    const rawData = JSON.parse(
      fs.readFileSync(__dirname + `/duneData/gitcoinDonationData.json`)
    )

    Enumerable.from(rawData.result.rows).forEach((x) => {
      let ownerAddress = x.from.toLowerCase()

      this.addScoreToLocalScoreData(ownerAddress, 1)
    })
  }

  static async processData(scoreData, multiplier, onlyNormalize = false) {
    console.log("Generating Gitcoin donations data...")

    let dataMinerGitcoinDonation = new DataMinerGitcoinDonation()

    if (!onlyNormalize) {
      await dataMinerGitcoinDonation.getData()

      dataMinerGitcoinDonation.writeLocalScoreDataToFile(`${this.name}_raw`)
    }

    console.log("Normalizing Gitcoin donations data...")

    await dataMinerGitcoinDonation.normalizeData(`${this.name}_raw`, multiplier)

    dataMinerGitcoinDonation.writeLocalScoreDataToFile(
      `${this.name}_normalized`
    )

    dataMinerGitcoinDonation.mergeLocalScoreDataWithOverallScoreData(scoreData)
  }
}
