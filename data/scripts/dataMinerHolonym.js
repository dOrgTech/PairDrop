import axios from "axios"
import Enumerable from "linq"
import { AbiCoder } from "ethers"
import DataMiner from "./dataMiner.js"

export default class DataMinerHolonym extends DataMiner {
  async getData(contractAddress, eventTopic) {
    const { status: responseStatus, data: responseData } = await axios.get(
      `https://api-optimistic.etherscan.io/api?module=logs&action=getLogs&address=${contractAddress}&topic0=${eventTopic}&page=1&offset=1000&apikey=${process.env.ETHERSCAN_OPTIMISM_APIKEY}`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )

    if (responseStatus != 200) {
      console.log("[ERROR] Error getting Humanbound data")

      return
    }

    Enumerable.from(responseData.result).forEach((x) => {
      let ownerAddress = AbiCoder.defaultAbiCoder().decode(
        ["address", "uint256"],
        x.data
      )[0]

      this.addScoreToLocalScoreData(ownerAddress, 1)
    })
  }

  static async processData(scoreData, multiplier, onlyNormalize = false) {
    console.log("Generating Holonym data...")

    let dataMinerHolonym = new DataMinerHolonym()

    if (!onlyNormalize) {
      await dataMinerHolonym.getData(
        "0x7497636F5E657e1E7Ea2e851cDc8649487dF3aab",
        "0x8e3ae60e21d8ff9f5e6d7714232751cbbaff6ccd8d9366369baa0f499fb0a6fb"
      )

      await dataMinerHolonym.getData(
        "0xdD748977BAb5782625AF1466F4C5F02Eb92Fce31",
        "0xd198fa8523413333ec863279d1630fa354ecc8b110ae00f9ca98c8b498fb4687"
      )

      await dataMinerHolonym.getData(
        "0xA40C8AAF7F47B18c1eDdBe7855b580f828eD9711",
        "0xd198fa8523413333ec863279d1630fa354ecc8b110ae00f9ca98c8b498fb4687"
      )

      dataMinerHolonym.writeLocalScoreDataToFile(`${this.name}_raw`)
    }

    console.log("Normalizing Holonym data...")

    await dataMinerHolonym.normalizeData(`${this.name}_raw`, multiplier)

    dataMinerHolonym.writeLocalScoreDataToFile(`${this.name}_normalized`)

    dataMinerHolonym.mergeLocalScoreDataWithOverallScoreData(scoreData)
  }
}
