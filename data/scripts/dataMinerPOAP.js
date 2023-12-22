import axiosRetry from "axios-retry"
import axios from "axios"
import Enumerable from "linq"
import delay from "delay"
import DataMiner from "./dataMiner.js"

export default class DataMinerPOAP extends DataMiner {
  async getData() {
    axiosRetry(axios, {
      retries: 5,
    })

    const { status: responseStatus, data: responseData } = await axios.post(
      "https://public.compass.poap.tech/v1/graphql",
      {
        query: `
          query PaginatedDrops(
            $limit: Int!
            $offset: Int!
            $orderBy: [drops_order_by!]
            $where: drops_bool_exp
          ) {
            drops(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
            id
            fancy_id
            name
            description
            city
            country
            channel
            platform
            location_type
            drop_url
            image_url
            animation_url
            year
            start_date
            timezone
            private
            created_date
            expiry_date
            end_date
            virtual
            stats_by_chain_aggregate {
              aggregate {
                sum {	transfer_count
                  poap_count
                }
              }
            }
            }
          }
        `,
        variables: {
          limit: 20000,
          offset: 0,
          where: {
            private: {
              _eq: "false",
            },
            stats_by_chain: {
              poap_count: {
                _gte: 4000,
              },
            },
          },
          orderBy: [
            {
              stats_by_chain_aggregate: {
                sum: {
                  poap_count: "desc",
                },
              },
            },
            {
              id: "desc",
            },
          ],
        },
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Origin: "https://poap.gallery",
          Referer: "https://poap.gallery/",
          "X-API-Key": "you_api_key", //No need to specify an API key, just a random string
        },
      }
    )

    if (responseStatus != 200) {
      console.log("[ERROR] Error getting POAP data")

      return
    }

    for (let i = 0; i < responseData.data.drops.length; i++) {
      let currentOffset = 0

      while (true) {
        const {
          status: eventPoapsOwnersResponseStatus,
          data: eventPoapsOwnersResponseData,
        } = await axios.get(
          `https://api.poap.tech/event/${responseData.data.drops[i].id}/poaps?limit=300&offset=${currentOffset}`,
          {
            headers: {
              accept: "application/json",
              "X-API-Key": process.env.POAP_APIKEY,
            },
          }
        )

        if (eventPoapsOwnersResponseStatus != 200) {
          console.log("[ERROR] Error getting POAP projectsdata")

          return
        }

        if (eventPoapsOwnersResponseData.tokens.length == 0) break

        Enumerable.from(eventPoapsOwnersResponseData.tokens).forEach((x) => {
          this.addScoreToLocalScoreData(x.owner.id.toLowerCase(), 1)
        })

        currentOffset += 300

        await delay(1000)
      }
    }
  }

  static async processData(scoreData, multiplier, onlyNormalize = false) {
    console.log("Generating POAP data...")

    let dataMinerPOAP = new DataMinerPOAP()

    if (!onlyNormalize) {
      await dataMinerPOAP.getData()

      dataMinerPOAP.writeLocalScoreDataToFile(`${this.name}_raw`)
    }

    console.log("Normalizing POAP data...")

    await dataMinerPOAP.normalizeData(`${this.name}_raw`, multiplier)

    dataMinerPOAP.writeLocalScoreDataToFile(`${this.name}_normalized`)

    dataMinerPOAP.mergeLocalScoreDataWithOverallScoreData(scoreData)
  }
}
