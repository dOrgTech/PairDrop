import axios from "axios"
import Enumerable from "linq"
import delay from "delay"
import DataMiner from "./dataMiner.js"

export default class DataMinerGitcoinProjectsOwners extends DataMiner {
  async getData() {
    let contractAddress = "0x03506eD3f57892C85DB20C36846e9c808aFe9ef4"

    let cursor = null

    while (true) {
      const { status: responseStatus, data: responseData } = await axios.post(
        `https://deep-index.moralis.io/api/v2.2/${contractAddress}/events?chain=eth&topic=0x63c92f9505d420bff631cb9df33be952bdc11e2118da36a850b43e6bcc4ce4de${
          cursor != null ? "&cursor=" + cursor : ""
        }`,
        '{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"projectID","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"ProjectCreated","type":"event"}',
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-API-Key": process.env.MORALIS_APYKEY,
          },
        }
      )

      if (responseStatus != 200) {
        console.log("[ERROR] Error getting Gitcoin projects owners data")

        return
      }

      Enumerable.from(responseData.result).forEach((x) => {
        let ownerAddress = x.data.owner.toLowerCase()

        this.addScoreToLocalScoreData(ownerAddress, 1)
      })

      cursor = responseData.cursor

      if (cursor == null) return

      await delay(1000)
    }
  }

  static async processData(scoreData, multiplier, onlyNormalize = false) {
    console.log("Generating Gitcoin projects owners data...")

    let dataMinerGitcoinProjectsOwners = new DataMinerGitcoinProjectsOwners()

    if (!onlyNormalize) {
      await dataMinerGitcoinProjectsOwners.getData()

      dataMinerGitcoinProjectsOwners.writeLocalScoreDataToFile(
        `${this.name}_raw`
      )
    }

    console.log("Normalizing Gitcoin projects owners data...")

    await dataMinerGitcoinProjectsOwners.normalizeData(
      `${this.name}_raw`,
      multiplier
    )

    dataMinerGitcoinProjectsOwners.writeLocalScoreDataToFile(
      `${this.name}_normalized`
    )

    dataMinerGitcoinProjectsOwners.mergeLocalScoreDataWithOverallScoreData(
      scoreData
    )
  }
}
