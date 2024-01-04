import Web3Token from "web3-token"
import PowerRanker from "./powerRanker.js"
import Votes from "./models/db_Votes.js"
import Enumerable from "linq"
import Projects from "./models/db_Projects.js"

export function randomNumberExcludedMax(min, max) {
  return Math.random() * (max - min) + min
}

export function integerRandomNumberExcludedMax(min, max) {
  return Math.floor(randomNumberExcludedMax(min, max))
}

export async function getAuthenticatedAddress(req, res) {
  try {
    const token = req.headers["auth"]

    const { address, body } = await Web3Token.verify(token)

    if (body.statement == "This is a signed message") return address

    res.status(401).json({ message: "Unauthorized User" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }

  return null
}

export async function updateProjectsRanking() {
  const projects = await Projects.find()

  const votes = await Votes.find()

  const items = []

  for (const project of projects) items.push(project.projectId)

  const powerRankerVotes = []

  for (const vote of votes)
    powerRankerVotes.push({
      alpha: vote.project1Id,
      beta: vote.project2Id,
      vote: vote.vote,
    })

  const powerRankerItems = new Set(items)

  const powerRanker = new PowerRanker(powerRankerItems, powerRankerVotes, false)

  let generatedRanking = powerRanker.run(1.0)

  for (const project of projects)
    await Projects.findByIdAndUpdate(project._id, {
      score: generatedRanking.get(project.projectId) * 100,
    })
}
