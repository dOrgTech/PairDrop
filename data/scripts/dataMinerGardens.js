import Enumerable from "linq"
import DataMiner from "./dataMiner.js"
import delay from "delay"
import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core/core.cjs"

export default class DataMinerGardens extends DataMiner {
  async getData() {
    const apolloClient = new ApolloClient({
      uri: `https://gateway.thegraph.com/api/${process.env.SUBGRAPH_APYKEY}/subgraphs/id/EucdbfTKw6d9DFeA2yHP8W9ZPciQGpAQHZMFCy3i7TxZ`,
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: "no-cache",
          errorPolicy: "ignore",
        },
        query: {
          fetchPolicy: "no-cache",
          errorPolicy: "all",
        },
      },
    })

    let currentProposalsSkip = 0

    while (true) {
      let queryResult = await apolloClient.query({
        query: gql`
          {
            organizations(first: 10, where: {proposalCount_gt: 10}) {
              proposals(first: 100, skip: ${currentProposalsSkip}) {
                id
              }
            }
          }
        `,
      })

      let supporterFound = false

      for (let i = 0; i < queryResult.data.organizations.length; i++)
        for (
          let j = 0;
          j < queryResult.data.organizations[i].proposals.length;
          j++
        ) {
          let currentStakesSkip = 0

          while (true) {
            let stakesQueryResult = await apolloClient.query({
              query: gql`
              {
                proposal(
                  id: "${queryResult.data.organizations[i].proposals[j].id}"
                ) {
                  stakes(first: 100, skip: ${currentStakesSkip}) {
                    supporter {
                      user {
                        address
                      }
                    }
                  }
                }
              }
            `,
            })

            if (
              stakesQueryResult.data.proposal == undefined ||
              stakesQueryResult.data.proposal.stakes.length == 0
            )
              break

            Enumerable.from(stakesQueryResult.data.proposal.stakes).forEach(
              (z) => {
                this.addScoreToLocalScoreData(
                  z.supporter.user.address.toLowerCase(),
                  1
                )

                supporterFound = true
              }
            )

            currentStakesSkip += 100
          }
        }

      currentProposalsSkip += 100

      if (!supporterFound) return

      await delay(500)
    }
  }

  static async processData(scoreData, multiplier, onlyNormalize = false) {
    console.log("Generating Gardens data...")

    let dataMinerGardens = new DataMinerGardens()

    if (!onlyNormalize) {
      await dataMinerGardens.getData()

      dataMinerGardens.writeLocalScoreDataToFile(`${this.name}_raw`)
    }

    console.log("Normalizing Gardens data...")

    await dataMinerGardens.normalizeData(`${this.name}_raw`, multiplier)

    dataMinerGardens.writeLocalScoreDataToFile(`${this.name}_normalized`)

    dataMinerGardens.mergeLocalScoreDataWithOverallScoreData(scoreData)
  }
}
