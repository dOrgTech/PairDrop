import axios from "axios"
import Enumerable from "linq"
import delay from "delay"
import DataMiner from "./dataMiner.js"

export default class DataMinerRossDAO extends DataMiner {
  async getData() {
    let contractAddress = "0xc102d2544a7029f7BA04BeB133dEADaA57fDF6b4"

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
        console.log("[ERROR] Error getting Ross DAO data")

        return
      }

      Enumerable.from(responseData.results).forEach((x) => {
        if (x.txType != "ETHEREUM_TRANSACTION") return

        Enumerable.from(x.transfers).forEach((y) => {
          if (y.to != contractAddress) return

          if (y.type != "ETHER_TRANSFER") return

          if (BigInt(y.value) < BigInt(process.env.DATAMINER_ROSSDAO_ETHTHRESHOLD)) return

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
    console.log("Generating Ross DAO data...")

    let dataMinerRossDAO = new DataMinerRossDAO()

    if (!onlyNormalize) {
      await dataMinerRossDAO.getData()

      dataMinerRossDAO.writeLocalScoreDataToFile(`${this.name}_raw`)
    }

    console.log("Normalizing Ross DAO data...")

    await dataMinerRossDAO.normalizeData(`${this.name}_raw`, multiplier)

    dataMinerRossDAO.writeLocalScoreDataToFile(`${this.name}_normalized`)

    dataMinerRossDAO.mergeLocalScoreDataWithOverallScoreData(scoreData)
  }
}
