import axios from "axios"
import Enumerable from "linq"
import delay from "delay"
import DataMiner from "./dataMiner.js"

export default class DataMinerPoolyNFT extends DataMiner {
  async getData(contractAddress) {
    let cursor = null

    while (true) {
      const { status: responseStatus, data: responseData } = await axios.get(
        `https://deep-index.moralis.io/api/v2.2/nft/${contractAddress}/owners?chain=eth&format=decimal${
          cursor != null ? "&cursor=" + cursor : ""
        }`,
        {
          headers: {
            accept: "application/json",
            "X-API-Key": process.env.MORALIS_APYKEY,
          },
        }
      )

      if (responseStatus != 200) {
        console.log("[ERROR] Error getting POOLY NFT data")

        return
      }

      Enumerable.from(responseData.result).forEach((x) => {
        let ownerAddress = x.owner_of.toLowerCase()

        this.addScoreToLocalScoreData(ownerAddress, 1)
      })

      cursor = responseData.cursor

      if (cursor == null) return

      await delay(1000)
    }
  }

  static async processData(scoreData, multiplier, onlyNormalize = false) {
    console.log("Generating POOLY NFT data...")

    let dataMinerPoolyNFT = new DataMinerPoolyNFT()

    if (!onlyNormalize) {
      await dataMinerPoolyNFT.getData(
        "0x90B3832e2F2aDe2FE382a911805B6933C056D6ed"
      )

      await dataMinerPoolyNFT.getData(
        "0x3545192b340f50d77403dc0a64cf2b32f03d00a9"
      )

      await dataMinerPoolyNFT.getData(
        "0x5663e3E096f1743e77B8F71b5DE0CF9Dfd058523"
      )

      dataMinerPoolyNFT.writeLocalScoreDataToFile(`${this.name}_raw`)
    }

    console.log("Normalizing POOLY NFT data...")

    await dataMinerPoolyNFT.normalizeData(`${this.name}_raw`, multiplier)

    dataMinerPoolyNFT.writeLocalScoreDataToFile(`${this.name}_normalized`)

    dataMinerPoolyNFT.mergeLocalScoreDataWithOverallScoreData(scoreData)
  }
}
