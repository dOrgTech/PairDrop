import express from "express"
import { getAuthenticatedAddress, updateProjectsRanking } from "../tools.js"
import { integerRandomNumberExcludedMax } from "../tools.js"
import Scores from "../models/db_Scores.js"
import Votes from "../models/db_Votes.js"
import Projects from "../models/db_Projects.js"
import Enumerable from "linq"
import UserTempData from "../models/db_UserTempData.js"

const router = express.Router()

router.get("/score", async function (req, res, next) {
  const userAddress = await getAuthenticatedAddress(req, res)

  if (!userAddress) return

  try {
    const score = await Scores.findOne({ address: userAddress })

    res.status(200).json(score)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get("/get-random-project-pair", async function (req, res, next) {
  const userAddress = await getAuthenticatedAddress(req, res)

  if (!userAddress) return

  try {
    const projects = await Projects.find()

    const votes = await Votes.find({ address: userAddress })

    const alreadyShownProjectsIds = Enumerable.from(votes)
      .select((x) => x.project1Id)
      .merge(Enumerable.from(votes).select((x) => x.project2Id))
      .toArray()

    let canBeShownProjects = Enumerable.from(projects)
      .where((x) => !alreadyShownProjectsIds.includes(x.projectId))
      .toArray()

    const project1RandomIndex = integerRandomNumberExcludedMax(
      0,
      canBeShownProjects.length
    )

    const project1 = canBeShownProjects[project1RandomIndex]

    canBeShownProjects = Enumerable.from(canBeShownProjects)
      .where((x) => x.projectId != project1.projectId)
      .toArray()

    const project2RandomIndex = integerRandomNumberExcludedMax(
      0,
      canBeShownProjects.length
    )

    const project2 = canBeShownProjects[project2RandomIndex]

    if (UserTempData.countDocuments({ address: userAddress }) == 0)
      UserTempData.findOneAndUpdate(
        { address: userAddress },
        { displayedProject1Id: project1.projectId, displayedProject2Id: project2.projectId }
      )
    else
      UserTempData.insertMany([
        {
          address: userAddress,
          displayedProject1Id: project1.projectId,
          displayedProject2Id: project2.projectId,
        },
      ])

    res.status(200).json({ project1: project1, project2: project2 })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/vote", async function (req, res, next) {
  const userAddress = await getAuthenticatedAddress(req, res)

  if (!userAddress) return

  try {
    const userTempData = await UserTempData.findOne({ address: userAddress })

    if (!userTempData) {
      res
        .status(500)
        .json({ message: "You need to generate a random project pair first" })

      return
    }

    const votedProjectId = req.body.votedProjectId

    if (
      votedProjectId != userTempData.displayedProject1Id &&
      votedProjectId != userTempData.displayedProject2Id
    ) {
      res.status(500).json({ message: "Wrong project id" })

      return
    }

    if (await Votes.countDocuments({ address: userAddress, project1Id: userTempData.displayedProject1Id, project2Id: userTempData.displayedProject2Id }) > 0) {
      res.status(500).json({ message: "You already voted for this pair, if you need to modify the vote call with patch" })

      return
    }

    const score = await Scores.findOne({ address: userAddress }) 

    await Votes.insertMany([
      {
        address: userAddress,
        project1Id: userTempData.displayedProject1Id,
        project2Id: userTempData.displayedProject2Id,
        vote:
          votedProjectId == userTempData.displayedProject1Id
            ? 1 - score.normalizedScore
            : score.normalizedScore,
      },
    ])

    await updateProjectsRanking()

    res.status(200).json({ message: "Vote executed" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.patch("/vote", async function (req, res, next) {
  const userAddress = await getAuthenticatedAddress(req, res)

  if (!userAddress) return

  try {
    const displayedProject1Id = req.body.displayedProject1Id

    const displayedProject2Id = req.body.displayedProject2Id

    const votedProjectId = req.body.votedProjectId

    const userVote = await Votes.findOne({
      address: userAddress,
      project1Id: displayedProject1Id,
      project2Id: displayedProject2Id,
    })

    if (!userVote) {
      res.status(500).json({ message: "Wrong data" })

      return
    }

    const score = await Scores.findOne({ address: userAddress })

    await Votes.findOneAndUpdate(
      {
        address: userAddress,
        project1Id: displayedProject1Id,
        project2Id: displayedProject2Id,
      },
      {
        vote:
          votedProjectId == displayedProject1Id
            ? 1 - score.normalizedScore
            : score.normalizedScore,
      }
    )

    await updateProjectsRanking()

    res.status(200).json({ message: "Vote executed" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
