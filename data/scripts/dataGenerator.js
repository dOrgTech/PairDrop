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

async function GenerateAll(onlyNormalize) {
  console.log(`Generating data... ${(onlyNormalize ? " (only normalizing)": "")}`)

  let scoreData = []

  await DataMinerGardens.processData(scoreData, process.env.DATAMINER_GARDENS_SCOREMULTIPLIER, onlyNormalize)
  await DataMinerGitcoinDonation.processData(scoreData, process.env.DATAMINER_GITCOINDONATION_SCOREMULTIPLIER, onlyNormalize)
  await DataMinerEAS.processData(scoreData, process.env.DATAMINER_EAS_SCOREMULTIPLIER, onlyNormalize)
  await DataMinerGitcoinProjectsOwners.processData(scoreData, process.env.DATAMINER_GITCOINPROJECTSOWNERS_SCOREMULTIPLIER, onlyNormalize)
  await DataMinerGiveth.processData(scoreData, process.env.DATAMINER_GIVETH_SCOREMULTIPLIER, onlyNormalize)
  await DataMinerHolonym.processData(scoreData, process.env.DATAMINER_HOLONYM_SCOREMULTIPLIER, onlyNormalize)
  await DataMinerHumanbound.processData(scoreData, process.env.DATAMINER_HUMANBOUND_SCOREMULTIPLIER, onlyNormalize)
  await DataMinerMirror.processData(scoreData, process.env.DATAMINER_MIRROR_SCOREMULTIPLIER, onlyNormalize)
  await DataMinerPOAP.processData(scoreData, process.env.DATAMINER_POAP_SCOREMULTIPLIER, onlyNormalize)
  await DataMinerPoolyNFT.processData(scoreData, process.env.DATAMINER_POOLYNFT_SCOREMULTIPLIER, onlyNormalize)
  await DataMinerProofOfHumanity.processData(scoreData, process.env.DATAMINER_PROOFOFHUMANITY_SCOREMULTIPLIER, onlyNormalize)
  await DataMinerRossDAO.processData(scoreData, process.env.DATAMINER_ROSSDAO_SCOREMULTIPLIER, onlyNormalize)
  await DataMinerUkraineDAO.processData(scoreData, process.env.DATAMINER_UKRAINEDAO_SCOREMULTIPLIER, onlyNormalize)

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
      process.env.FINALNORMALIZATION_MIN,
      process.env.FINALNORMALIZATION_MAX
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

switch (process.argv[2]) {
  case "-gen": {
    GenerateAll(false)

    break
  }
  case "-onlynorm": {
    GenerateAll(true)

    break
  }
}
