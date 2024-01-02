import * as dotenv from "dotenv"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import Enumerable from "linq"
import DataMinerGardens from "./dataMinerGardens.js"
import DataMinerGitcoinDonation from "./dataMinerGitcoinDonation.js"
import DataMinerEAS from "./dataMinerEAS.js"
import DataMinerGitcoinProjectsOwners from "./dataMinerGitcoinProjectsOwners.js"
import DataMinerGiveth from "./dataMinerGiveth.js"
import DataMinerHolonym from "./dataMinerHolonym.js"
import DataMinerHumanbound from "./dataMinerHumanbound.js"
import DataMinerMirror from "./dataMinerMirror.js"
import DataMinerPOAP from "./dataMinerPOAP.js"
import DataMinerPoolyNFT from "./dataMinerPoolyNFT.js"
import DataMinerProofOfHumanity from "./dataMinerProofOfHumanity.js"
import DataMinerRossDAO from "./dataMinerRossDAO.js"
import DataMinerUkraineDAO from "./dataMinerUkraineDAO.js"
import { normalizeValueStandard } from "./tools.js"

dotenv.config()

async function GenerateAll() {
  console.log("Generating data...")

  const onlyNormalize = false

  let scoreData = []

  await DataMinerGardens.processData(scoreData, 1, onlyNormalize)
  await DataMinerGitcoinDonation.processData(scoreData, 1, onlyNormalize)
  await DataMinerEAS.processData(scoreData, 1, onlyNormalize)
  await DataMinerGitcoinProjectsOwners.processData(scoreData, 1, onlyNormalize)
  await DataMinerGiveth.processData(scoreData, 1, onlyNormalize)
  await DataMinerHolonym.processData(scoreData, 1, onlyNormalize)
  await DataMinerHumanbound.processData(scoreData, 1, onlyNormalize)
  await DataMinerMirror.processData(scoreData, 1, onlyNormalize)
  await DataMinerPOAP.processData(scoreData, 1.5, onlyNormalize)
  await DataMinerPoolyNFT.processData(scoreData, 1, onlyNormalize)
  await DataMinerProofOfHumanity.processData(scoreData, 1, onlyNormalize)
  await DataMinerRossDAO.processData(scoreData, 1, onlyNormalize)
  await DataMinerUkraineDAO.processData(scoreData, 1, onlyNormalize)

  const overallMinScore = Enumerable.from(scoreData).min((x) => x.score)

  console.log(`Overall min score: ${overallMinScore}`)

  const overallMaxScore = Enumerable.from(scoreData).max((x) => x.score)

  console.log(`Overall max score: ${overallMaxScore}`)

  //Calculate and write normalized score
  for (const currentScore of scoreData) {
    currentScore.normalizedScore = normalizeValueStandard(
      currentScore.score,
      overallMinScore,
      overallMaxScore,
      0,
      0.5
    )
  }

  //Write overall scoreData
  const serializedData = JSON.stringify(scoreData, null, 2)

  const __filename = fileURLToPath(import.meta.url)

  const __dirname = path.dirname(__filename)

  fs.writeFileSync(
    __dirname + `/dataMinersOutput/OverallNormalized.json`,
    serializedData
  )
}

GenerateAll()
