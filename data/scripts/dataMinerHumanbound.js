import axios from "axios"
import Enumerable from "linq"
import delay from "delay"
import { AbiCoder } from "ethers"
import DataMiner from "./dataMiner.js"

export default class DataMinerHumanbound extends DataMiner {
  async getData(chainName, contractAddress) {
    switch (chainName) {
      case "eth":
      case "polygon":
      case "arbitrum": {
        let cursor = null

        while (true) {
          const { status: responseStatus, data: responseData } =
            await axios.post(
              `https://deep-index.moralis.io/api/v2.2/${contractAddress}/events?chain=${chainName}&topic=0x30385c845b448a36257a6a1716e6ad2e1bc2cbe333cde1e69fe849ad6511adfe${
                cursor != null ? "&cursor=" + cursor : ""
              }`,
              '{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address","internal_type":"address"},{"indexed":true,"name":"tokenId","type":"uint256","internal_type":"uint256"}],"name":"Minted","type":"event"}',
              {
                headers: {
                  accept: "application/json",
                  "Content-Type": "application/json",
                  "X-API-Key": process.env.MORALIS_APYKEY,
                },
              }
            )

          if (responseStatus != 200) {
            console.log("[ERROR] Error getting Humanbound data")

            return
          }

          Enumerable.from(responseData.result).forEach((x) => {
            let ownerAddress = x.data.to.toLowerCase()

            this.addScoreToLocalScoreData(ownerAddress, 1)
          })

          cursor = responseData.cursor

          if (cursor == null) return

          await delay(1000)
        }

        break
      }
      case "optimism": {
        const { status: responseStatus, data: responseData } = await axios.get(
          `https://api-optimistic.etherscan.io/api?module=logs&action=getLogs&address=${contractAddress}&topic0=0x30385c845b448a36257a6a1716e6ad2e1bc2cbe333cde1e69fe849ad6511adfe&page=1&offset=1000&apikey=${process.env.ETHERSCAN_OPTIMISM_APIKEY}`,
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
          let eventTopics = x.topics

          let ownerAddress = AbiCoder.defaultAbiCoder().decode(
            ["address"],
            eventTopics[1]
          )[0]

          this.addScoreToLocalScoreData(ownerAddress, 1)
        })

        break
      }
    }
  }

  static async processData(scoreData, multiplier, onlyNormalize = false) {
    console.log("Generating Humanbound data...")

    let dataMinerHumanbound = new DataMinerHumanbound()

    if (!onlyNormalize) {
      await dataMinerHumanbound.getData(
        "eth",
        "0x594E5550ecE2c10e5d580e538871914F55884f5d"
      )

      await dataMinerHumanbound.getData(
        "polygon",
        "0x41Be3A6C17cf76442d9E7B150de4870027D36f52"
      )

      await dataMinerHumanbound.getData(
        "optimism",
        "0xFF439bA52825Ffd65E39Fd2bF519566d0cd91827"
      )

      await dataMinerHumanbound.getData(
        "arbitrum",
        "0x5beB956A9Af054956c5C6c0aFac7b109236f86Aa"
      )

      dataMinerHumanbound.writeLocalScoreDataToFile(`${this.name}_raw`)
    }

    console.log("Normalizing Humanbound data...")

    await dataMinerHumanbound.normalizeData(`${this.name}_raw`, multiplier)

    dataMinerHumanbound.writeLocalScoreDataToFile(`${this.name}_normalized`)

    dataMinerHumanbound.mergeLocalScoreDataWithOverallScoreData(scoreData)
  }
}
