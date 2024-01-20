import axios from "axios"
import Enumerable from "linq"
import delay from "delay"
import DataMiner from "./dataMiner.js"

export default class DataMinerMirror extends DataMiner {
  async getData() {
    const { status: responseStatus, data: responseData } = await axios.post(
      "https://mirror.xyz/api/graphql",
      {
        operationName: "projectCollection",
        variables: {
          projectAddress: "0xe60aC07Be8bD7f7f33d446e1399c329928Ba8114",
          limit: 1000000,
        },
        query: `
            query projectCollection($projectAddress: String!, $limit: Int!, $cursorStart: Float, $cursorEnd: Float, $filterDigests: [String]) {
              projectCollects(
              projectAddress: $projectAddress
              limit: $limit
              cursorStart: $cursorStart
              cursorEnd: $cursorEnd
              filterDigests: $filterDigests
              ) {
                cursorStart
                cursorEnd
                wnfts {
                  _id
                  address
                  eventTimestamp
                  entry {
                    ...entryDetails
                    publisher {
                      ...publisherDetails
                      __typename
                    }
                    settings {
                    ...entrySettingsDetails
                    __typename
                    }
                    writingNFT {
                    ...writingNFTDetails
                    purchases {
                    ...writingNFTPurchaseDetails
                    __typename
                    }
                    __typename
                    }
                    collectorBubbles {
                    _id
                    address
                    project {
                    ...projectDetails
                    __typename
                    }
                    __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
            }
            fragment entryDetails on entry {
            _id
              body
              hideTitleInEntry
              publishStatus
              publishedAtTimestamp
              digest
              timestamp
              title
              arweaveTransactionRequest {
                transactionId
                __typename
              }
              featuredImageId
              featuredImage {
                mimetype
                url
                __typename
              }
              publisher {
                ...publisherDetails
                __typename
              }
              __typename
            }
              
            fragment publisherDetails on PublisherType {
              project {
                ...projectDetails
                __typename
              }
              member {
                ...projectDetails
                __typename
              }
              __typename
            }
            fragment projectDetails on ProjectType {
              _id
              address
              avatarURL
              description
              displayName
              domain
              ens
              gaTrackingID
              ga4TrackingID
              mailingListURL
              twitterUsername
              wnftChainId
              externalUrl
              headerImage {
                ...mediaAsset
                __typename
              }
              theme {
                ...themeDetails
                __typename
              }
              __typename
            }
            fragment mediaAsset on MediaAssetType {
              id
              cid
              mimetype
              sizes {
                ...mediaAssetSizes
                __typename
              }
              url
              __typename
            }
            fragment mediaAssetSizes on MediaAssetSizesType {
              og {
                ...mediaAssetSize
                __typename
              }
              lg {
                ...mediaAssetSize
                __typename
              }
              md {
                ...mediaAssetSize
                __typename
              }
              sm {
                ...mediaAssetSize
                __typename
              }
              __typename
            }
            fragment mediaAssetSize on MediaAssetSizeType {
              src
              height
              width
              __typename
            }
            fragment themeDetails on UserProfileThemeType {
              accent
              colorMode
              __typename
            }
            fragment entrySettingsDetails on EntrySettingsType {
              description
              metaImage {
                ...mediaAsset
                __typename
              }
              title
              __typename
            }
            fragment writingNFTDetails on WritingNFTType {
              _id
              contractURI
              contentURI
              deploymentSignature
              deploymentSignatureType
              description
              digest
              fee
              fundingRecipient
              imageURI
              canMint
              media {
                id
                cid
                __typename
              }
              nonce
              optimisticNumSold
              owner
              price
              proxyAddress
              publisher {
                project {
                  ...writingNFTProjectDetails
                  __typename
                }
                __typename
              }
              quantity
              renderer
              signature
              symbol
              timestamp
              title
              version
              network {
                ...networkDetails
                __typename
              }
              __typename
            }
            fragment writingNFTProjectDetails on ProjectType {
              _id
              address
              avatarURL
              displayName
              domain
              ens
              description
              __typename
            }
            fragment networkDetails on NetworkType {
              _id
              chainId
              __typename
            }
            fragment writingNFTPurchaseDetails on WritingNFTPurchaseType {
              numSold
              __typename
            }
          `,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Origin: "https://mirror.xyz",
        },
      }
    )

    if (responseStatus != 200) {
      console.log("[ERROR] Error getting Mirror data")

      return
    }

    for (let i = 0; i < responseData.data.projectCollects.wnfts.length; i++) {
      let soldCount =
        responseData.data.projectCollects.wnfts[i].entry.writingNFT
          .optimisticNumSold

      let proxyAddress =
        responseData.data.projectCollects.wnfts[i].entry.writingNFT.proxyAddress

      let tokenIds = []

      for (let j = 1; j <= soldCount; j++) tokenIds.push(j)

      const { status: projectResponseStatus, data: projectResponseData } =
        await axios.post(
          "https://mirror.xyz/api/graphql",
          {
            operationName: "WritingNFTCollections",
            variables: {
              proxyAddress: proxyAddress,
              tokenIds: tokenIds,
            },
            query: `
            query WritingNFTCollections($proxyAddress: String!, $tokenIds: [Int!]!) {
              writingNFTCollections(proxyAddress: $proxyAddress, tokenIds: $tokenIds) {
                collections {
                  ...writingNFTCollectorDetails
                  __typename
                }
                __typename
              }
            }
            fragment writingNFTCollectorDetails on WritingNFTCollectorType {
              _id
              address
              blockNumber
              message
              price
              tokenId
              transactionHash
              project {
                ...writingNFTProjectDetails
                __typename
              }
              __typename
            }
            fragment writingNFTProjectDetails on ProjectType {
              _id
              address
              avatarURL
              displayName
              domain
              ens
              description
              __typename
            }
              `,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Origin: "https://mirror.xyz",
            },
          }
        )

      if (projectResponseStatus != 200) {
        console.log("[ERROR] Error getting Mirror project data")

        return
      }

      Enumerable.from(
        projectResponseData.data.writingNFTCollections.collections
      ).forEach((x) => {
        this.addScoreToLocalScoreData(x.address.toLowerCase(), 1)
      })

      await delay(500)
    }
  }

  static async processData(scoreData, multiplier, onlyNormalize = false) {
    console.log("Generating Mirror data...")

    let dataMinerMirror = new DataMinerMirror()

    if (!onlyNormalize) {
      await dataMinerMirror.getData()

      dataMinerMirror.writeLocalScoreDataToFile(`${this.name}_raw`)
    }

    console.log("Normalizing Mirror data...")

    await dataMinerMirror.normalizeData(`${this.name}_raw`, multiplier)

    dataMinerMirror.writeLocalScoreDataToFile(`${this.name}_normalized`)

    dataMinerMirror.mergeLocalScoreDataWithOverallScoreData(scoreData)
  }
}
