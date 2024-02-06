import axios from "axios"
import Enumerable from "linq"
import delay from "delay"
import DataMiner from "./dataMiner.js"

export default class DataMinerUkraineDAO extends DataMiner {
  async getData() {
    let contractAddress = "0x633b7218644b83D57d90e7299039ebAb19698e9C"

    let currentURI = `https://safe-transaction-mainnet.safe.global/api/v1/safes/${contractAddress}/all-transactions/?executed=true&queued=false&trusted=true`

    while (true) {
      const { status: responseStatus, data: responseData } = await axios.get(
        currentURI,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )

      if (responseStatus != 200) {
        console.log("[ERROR] Error getting Ukraine DAO data")

        return
      }

      Enumerable.from(responseData.results).forEach((x) => {
        if (x.txType != "ETHEREUM_TRANSACTION") return

        Enumerable.from(x.transfers).forEach((y) => {
          if (y.to != contractAddress) return

          if (y.type == "ETHER_TRANSFER") {
            if (BigInt(y.value) < BigInt(process.env.DATAMINER_UKRAINEDAO_ETHTHRESHOLD)) return
          }

          if (y.type == "ERC20_TRANSFER") {
            if (!y.tokenInfo) return

            if (
              y.tokenInfo.symbol != "USDC" &&
              y.tokenInfo.symbol != "USDT" &&
              y.tokenInfo.symbol != "DAI" &&
              y.tokenInfo.symbol != "WETH"
            )
              return

            switch (y.tokenInfo.symbol) {
              case "USDC":
              case "USDT":
              case "DAI":
                {
                  if (BigInt(y.value) < BigInt(process.env.DATAMINER_UKRAINEDAO_STABLECOINTHRESHOLD)) return
                }
                break
              case "WETH":
                {
                  if (BigInt(y.value) < BigInt(process.env.DATAMINER_UKRAINEDAO_ETHTHRESHOLD)) return
                }
                break
            }
          }

          let fromAddress = y.from.toLowerCase()

          this.addScoreToLocalScoreData(fromAddress, 1)
        })
      })

      currentURI = responseData.next

      if (currentURI == null) return

      await delay(500)
    }
  }

  static async processData(scoreData, multiplier, onlyNormalize = false) {
    console.log("Generating Ukraine DAO data...")

    let dataMinerUkraineDAO = new DataMinerUkraineDAO()

    if (!onlyNormalize) {
      await dataMinerUkraineDAO.getData()

      dataMinerUkraineDAO.writeLocalScoreDataToFile(`${this.name}_raw`)
    }

    console.log("Normalizing Ukraine DAO data...")

    await dataMinerUkraineDAO.normalizeData(`${this.name}_raw`, multiplier)

    dataMinerUkraineDAO.writeLocalScoreDataToFile(`${this.name}_normalized`)

    dataMinerUkraineDAO.mergeLocalScoreDataWithOverallScoreData(scoreData)
  }
}
