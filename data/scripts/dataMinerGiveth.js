import axios from "axios"
import Enumerable from "linq"
import delay from "delay"
import DataMiner from "./dataMiner.js"

export default class DataMinerGiveth extends DataMiner {
  async getData() {
    let currentOffset = 0

    while (true) {
      const { status: responseStatus, data: responseData } = await axios.post(
        "https://mainnet.serve.giveth.io/graphql",
        {
          operationName: "FetchAllProjects",
          variables: {
            limit: 50,
            skip: currentOffset,
            sortingBy: "InstantBoosting",
          },
          query: `
            fragment ProjectCoreFields on Project {
              __typename
              id
              title
              image
              slug
              verified
              totalDonations
              qfRounds {
                id
                name
                isActive
                beginDate
                endDate
              }
            }
            fragment ProjectCardFields on Project {
              ...ProjectCoreFields
              descriptionSummary
              totalReactions
              reaction {
                id
                userId
              }
              adminUser {
                name
                walletAddress
                avatar
              }
              updatedAt
              organization {
                label
              }
              projectPower {
                powerRank
                totalPower
                round
              }
              sumDonationValueUsdForActiveQfRound
              sumDonationValueUsd
              countUniqueDonorsForActiveQfRound
              countUniqueDonors
              estimatedMatching {
                projectDonationsSqrtRootSum
                allProjectsSum
                matchingPool
              }
            }
            query FetchAllProjects($limit: Int, $skip: Int, $sortingBy: SortingField, $filters: [FilterField!], $searchTerm: String, $category: String, $mainCategory: String, $campaignSlug: String, $connectedWalletUserId: Int) {
              allProjects(
                limit: $limit
                skip: $skip
                sortingBy: $sortingBy
                filters: $filters
                searchTerm: $searchTerm
                category: $category
                mainCategory: $mainCategory
                campaignSlug: $campaignSlug
                connectedWalletUserId: $connectedWalletUserId
              ) 
              {
                projects {
                  ...ProjectCardFields
                }
                totalCount
                categories {
                  name
                }
              }
            }
        `,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )

      if (responseStatus != 200) {
        console.log("[ERROR] Error getting Giveth data")

        return
      }

      if (responseData.data.allProjects.projects.length == 0) return

      for (let i = 0; i < responseData.data.allProjects.projects.length; i++) {
        const { status: donationsResponseStatus, data: donationsResponseData } =
          await axios.post(
            "https://mainnet.serve.giveth.io/graphql",
            {
              operationName: "DonationsByProjectId",
              variables: {
                projectId: parseInt(
                  responseData.data.allProjects.projects[i].id
                ),
                take: 100000,
                skip: 0,
                orderBy: {
                  field: "UsdAmount",
                  direction: "DESC",
                },
                status: "verified",
              },
              query: `fragment DonationCoreFields on Donation {
                __typename
                id
                anonymous
                amount
                valueUsd
                currency
                transactionId
                transactionNetworkId
                createdAt
                donationType
                status
                onramperId
              }
              query DonationsByProjectId($take: Int, $skip: Int, $traceable: Boolean, $qfRoundId: Int, $projectId: Int!, $searchTerm: String, $orderBy: SortBy, $status: String) {
              donationsByProjectId(
                take: $take
                skip: $skip
                traceable: $traceable
                qfRoundId: $qfRoundId
                projectId: $projectId
                searchTerm: $searchTerm
                orderBy: $orderBy
                status: $status
              ) {
                donations {
                  ...DonationCoreFields
                  user {
                    name
                    walletAddress
                    avatar
                  }
                }
                totalCount
                totalUsdBalance
                }
              }`,
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )

        if (donationsResponseStatus != 200) {
          console.log("[ERROR] Error getting Giveth donations data")

          return
        }

        Enumerable.from(
          donationsResponseData.data.donationsByProjectId.donations
        ).forEach((x) => {
          if (x.valueUsd < 100) return

          if (x.user != null)
            this.addScoreToLocalScoreData(x.user.walletAddress.toLowerCase(), 1)
        })

        await delay(500)
      }

      currentOffset += 50

      await delay(500)
    }
  }

  static async processData(scoreData, multiplier, onlyNormalize = false) {
    console.log("Generating Giveth data...")

    let dataMinerGiveth = new DataMinerGiveth()

    if (!onlyNormalize) {
      await dataMinerGiveth.getData()

      dataMinerGiveth.writeLocalScoreDataToFile(`${this.name}_raw`)
    }

    console.log("Normalizing Giveth data...")

    await dataMinerGiveth.normalizeData(`${this.name}_raw`, multiplier)

    dataMinerGiveth.writeLocalScoreDataToFile(`${this.name}_normalized`)

    dataMinerGiveth.mergeLocalScoreDataWithOverallScoreData(scoreData)
  }
}
