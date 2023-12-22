import Enumerable from "linq"
import DataMiner from "./dataMiner.js"
import delay from "delay"
import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core/core.cjs"

export default class DataMinerProofOfHumanity extends DataMiner {
  async getData() {
    const apolloClient = new ApolloClient({
      uri: `https://gateway.thegraph.com/api/${process.env.SUBGRAPH_APYKEY}/subgraphs/id/CvzNejNZR2UTQ66wL7miGgfWh9dmiwgTtTfgQCBvMQRE`,
      cache: new InMemoryCache(),
    })

    let currentSkip = 0

    while (true) {
      let queryResult = await apolloClient.query({
        query: gql`
          {
            submissions(first: 100, skip: ${currentSkip}, where: { registered: true}) 
            {
              requests(first: 1) {
                requester
              }
            }
          }
        `,
      })

      if (queryResult.data.submissions.length == 0) return

      Enumerable.from(queryResult.data.submissions).forEach((x) => {
        this.addScoreToLocalScoreData(x.requests[0].requester.toLowerCase(), 1)
      })

      currentSkip += 100

      await delay(500)
    }
  }

  static async processData(scoreData, multiplier, onlyNormalize = false) {
    console.log("Generating ProofOfHumanity data...")

    let dataMinerProofOfHumanity = new DataMinerProofOfHumanity()

    if (!onlyNormalize) {
      await dataMinerProofOfHumanity.getData()

      dataMinerProofOfHumanity.writeLocalScoreDataToFile(`${this.name}_raw`)
    }

    console.log("Normalizing ProofOfHumanity data...")

    await dataMinerProofOfHumanity.normalizeData(`${this.name}_raw`, multiplier)

    dataMinerProofOfHumanity.writeLocalScoreDataToFile(
      `${this.name}_normalized`
    )

    dataMinerProofOfHumanity.mergeLocalScoreDataWithOverallScoreData(scoreData)
  }
}
