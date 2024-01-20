import * as dotenv from "dotenv"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import Enumerable from "linq"

dotenv.config()

async function GenerateStatistics(scoreDataFileName) {
  console.log("Generating statistics...")

  const __filename = fileURLToPath(import.meta.url)

  const __dirname = path.dirname(__filename)

  const scoreData = JSON.parse(
    fs.readFileSync(__dirname + `/dataMinersOutput/${scoreDataFileName}`)
  )

  const minScore = Enumerable.from(scoreData).min((x) => x.score)

  console.log(`Min score: ${minScore}`)

  const maxScore = Enumerable.from(scoreData).max((x) => x.score)

  console.log(`Max score: ${maxScore}`)

  const averageScore = Enumerable.from(scoreData).average((x) => x.score)

  console.log(`Average score: ${averageScore}`)

  const belowAverageWalletsCount = Enumerable.from(scoreData).count(x => x.score < averageScore)

  console.log(`Below average wallets count: ${belowAverageWalletsCount}`)

  const aboveAverageWalletsCount = Enumerable.from(scoreData).count(x => x.score > averageScore)

  console.log(`Above average wallets count: ${aboveAverageWalletsCount}`)
}

GenerateStatistics(process.argv[2])