import express from "express"
import { getAuthenticatedAddress, updateProjectsRanking } from "../tools.js"
import { integerRandomNumberExcludedMax } from "../tools.js"
import Scores from "../models/db_Scores.js"
import Projects from "../models/db_Projects.js"
import Enumerable from "linq"
import UsersData from "../models/db_UsersData.js"

const router = express.Router()

/**
 * @swagger
 * /user/score:
 *   get:
 *     summary: Retrieves user score data
 *     parameters:
 *       - in: header
 *         name: auth
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: The user score data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 address:
 *                   type: string
 *                   example: 0x0000000000000000000000000000000000000000
 *                 score:
 *                   type: number
 *                   example: 100.75
 *                 normalizedScore:
 *                   type: number
 *                   example: 0.12
 *       500:
 *         description: Error getting user score data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.get("/score", async function (req, res, next) {
  const userAddress = await getAuthenticatedAddress(req, res)

  if (!userAddress) return

  try {
    const score = await getUserScore(userAddress)

    if (score == null) {
      res
        .status(200)
        .json(
          new Scores({ address: userAddress, score: 0, normalizedScore: 0 })
        )

      return
    }

    res.status(200).json(score)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

/**
 * @swagger
 * /user/votes:
 *   get:
 *     summary: Retrieves user votes data
 *     parameters:
 *       - in: header
 *         name: auth
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: The user votes data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstProjectId:
 *                   type: integer
 *                   example: 1
 *                 secondProjectId:
 *                   type: integer
 *                   example: 3
 *                 status:
 *                   type: string
 *                   example: "voted"
 *                 votedProjectId:
 *                   type: integer
 *                   example: 3
 *                 vote:
 *                   type: number
 *                   example: 0.12
 *       500:
 *         description: Error getting user votes data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.get("/votes", async function (req, res, next) {
  const userAddress = await getAuthenticatedAddress(req, res)

  if (!userAddress) return

  try {
    let userData = await UsersData.findOne({ address: userAddress })

    if (userData == null) {
      await generateNewRandomProjectPair(userAddress)

      userData = await UsersData.findOne({ address: userAddress })
    }

    const projects = await Projects.find()

    const votesData = []

    for (const vote of userData.votes) {
      const firstProject = Enumerable.from(projects)
        .where((x) => x.projectId == vote.firstProjectId)
        .first()

      const secondProject = Enumerable.from(projects)
        .where((x) => x.projectId == vote.secondProjectId)
        .first()

      let votedProject = null

      if (vote.status == "voted") {
        votedProject =
          vote.votedProjectId == vote.firstProjectId
            ? firstProject
            : secondProject
      }

      votesData.push({
        pairIndex: vote.pairIndex,
        firstProject: firstProject,
        secondProject: secondProject,
        status: vote.status,
        votedProject: votedProject,
        vote: vote.vote,
      })
    }

    res.status(200).json(votesData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

/**
 * @swagger
 * /user/get-random-project-pair:
 *   get:
 *     summary: Generates and retrieves a random projects pair
 *     parameters:
 *       - in: header
 *         name: auth
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: The random projects pair
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstProject:
 *                   type: object
 *                 secondProject:
 *                   type: object
 *       500:
 *         description: Error getting a random projects pair
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.get("/get-random-project-pair", async function (req, res, next) {
  const userAddress = await getAuthenticatedAddress(req, res)

  if (!userAddress) return

  try {
    const score = await getUserScore(userAddress)

    if (score == null) {
      res.status(200).json({
        firstProject: null,
        secondProject: null,
      })

      return
    }

    const projectPairData = await generateNewRandomProjectPair(
      userAddress,
      req.query.pairIndex
    )

    res.status(200).json({
      pairIndex: projectPairData.pairIndex,
      firstProject: projectPairData.firstProject,
      secondProject: projectPairData.secondProject,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

/**
 * @swagger
 * /user/vote:
 *   post:
 *     summary: Votes for a project in a random pair
 *     parameters:
 *       - in: header
 *         name: auth
 *         type: string
 *         required: true
 *       - in: body
 *         schema:
 *           type: object
 *           required:
 *             - votedProjectId
 *           properties:
 *             votedProjectId:
 *               type: integer
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstProject:
 *                   type: object
 *                 secondProject:
 *                   type: object
 *       500:
 *         description: Error voting for a project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.post("/vote", async function (req, res, next) {
  const userAddress = await getAuthenticatedAddress(req, res)

  if (!userAddress) return

  try {
    const userData = await UsersData.findOne({ address: userAddress })

    if (
      Enumerable.from(userData.votes).count((x) => x.status == "displayed") == 0
    ) {
      res.status(500).json({ message: "Nothing to vote" })

      return
    }

    const toVoteData = Enumerable.from(userData.votes)
      .where((x) => x.status == "displayed")
      .first()

    const votedProjectId = req.body.votedProjectId

    if (
      votedProjectId != toVoteData.firstProjectId &&
      votedProjectId != toVoteData.secondProjectId
    ) {
      res.status(500).json({ message: "Wrong project id" })

      return
    }

    const score = await getUserScore(userAddress)

    toVoteData.status = "voted"

    toVoteData.votedProjectId = votedProjectId

    toVoteData.vote =
      votedProjectId == toVoteData.firstProjectId
        ? process.env.PROJECTPAIR_FIRSTPROJECT_STARTINGSCORE + score.normalizedScore
        : process.env.PROJECTPAIR_SECONDPROJECT_ENDSCORE - score.normalizedScore

    await UsersData.findOneAndUpdate(
      { address: userAddress },
      {
        votes: userData.votes,
      }
    )

    await updateProjectsRanking()

    const projectPairData = await generateNewRandomProjectPair(userAddress)

    res.status(200).json({
      pairIndex: projectPairData.pairIndex,
      firstProject: projectPairData.firstProject,
      secondProject: projectPairData.secondProject,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

/**
 * @swagger
 * /user/vote:
 *   patch:
 *     summary: Edits the vote for a project in a random pair
 *     parameters:
 *       - in: header
 *         name: auth
 *         type: string
 *         required: true
 *       - in: body
 *         schema:
 *           type: object
 *           required:
 *             - firstProjectId
 *             - secondProjectId
 *             - votedProjectId
 *           properties:
 *             firstProjectId:
 *               type: integer
 *               example: 1
 *             secondProjectId:
 *               type: integer
 *               example: 3
 *             votedProjectId:
 *               type: integer
 *               example: 3
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *       500:
 *         description: Error voting for a project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.patch("/vote", async function (req, res, next) {
  const userAddress = await getAuthenticatedAddress(req, res)

  if (!userAddress) return

  try {
    const firstProjectId = req.body.firstProjectId

    const secondProjectId = req.body.secondProjectId

    const votedProjectId = req.body.votedProjectId

    if (votedProjectId != firstProjectId && votedProjectId != secondProjectId) {
      res.status(500).json({ message: "Wrong voted project id" })

      return
    }

    const userData = await UsersData.findOne({ address: userAddress })

    if (
      !Enumerable.from(userData.votes).any(
        (x) =>
          x.firstProjectId == firstProjectId &&
          x.secondProjectId == secondProjectId &&
          x.status == "voted"
      )
    ) {
      res.status(500).json({ message: "Wrong project pair" })

      return
    }

    const score = await getUserScore(userAddress)

    const toUpdateVoteData = Enumerable.from(userData.votes)
      .where(
        (x) =>
          x.firstProjectId == firstProjectId &&
          x.secondProjectId == secondProjectId
      )
      .first()

    toUpdateVoteData.votedProjectId = votedProjectId

    toUpdateVoteData.vote =
      votedProjectId == firstProjectId
        ? process.env.PROJECTPAIR_FIRSTPROJECT_STARTINGSCORE + score.normalizedScore
        : process.env.PROJECTPAIR_SECONDPROJECT_ENDSCORE - score.normalizedScore

    await UsersData.findOneAndUpdate(
      { address: userAddress },
      {
        votes: userData.votes,
      }
    )

    await updateProjectsRanking()

    res.status(200).json({ message: "Vote updated" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

async function generateNewRandomProjectPair(userAddress, pairIndex = null) {
  const projects = await Projects.find()

  const userData = await UsersData.findOne({ address: userAddress })

  let alreadyShownProjectsIds = []

  let userVotesData = []

  if (userData != null) {
    if (pairIndex != null)
      if (
        Enumerable.from(userData.votes).count((x) => x.pairIndex == pairIndex) >
        0
      ) {
        const toReturnProjectPairData = Enumerable.from(userData.votes)
          .where((x) => x.pairIndex == pairIndex)
          .first()

        return {
          pairIndex: toReturnProjectPairData.pairIndex,
          firstProject: Enumerable.from(projects)
            .where((x) => x.projectId == toReturnProjectPairData.firstProjectId)
            .first(),
          secondProject: Enumerable.from(projects)
            .where(
              (x) => x.projectId == toReturnProjectPairData.secondProjectId
            )
            .first(),
        }
      }

    if (
      Enumerable.from(userData.votes).count((x) => x.status == "displayed") > 0
    ) {
      const toVoteProjectPairData = Enumerable.from(userData.votes)
        .where((x) => x.status == "displayed")
        .first()

      return {
        pairIndex: toVoteProjectPairData.pairIndex,
        firstProject: Enumerable.from(projects)
          .where((x) => x.projectId == toVoteProjectPairData.firstProjectId)
          .first(),
        secondProject: Enumerable.from(projects)
          .where((x) => x.projectId == toVoteProjectPairData.secondProjectId)
          .first(),
      }
    }
    alreadyShownProjectsIds = Enumerable.from(userData.votes)
      .select((x) => x.firstProjectId)
      .merge(Enumerable.from(userData.votes).select((x) => x.secondProjectId))
      .toArray()

    userVotesData = userData.votes
  }

  let canBeShownProjects = Enumerable.from(projects)
    .where((x) => !alreadyShownProjectsIds.includes(x.projectId))
    .toArray()

  const firstProjectRandomIndex = integerRandomNumberExcludedMax(
    0,
    canBeShownProjects.length
  )

  const firstProject = canBeShownProjects[firstProjectRandomIndex]

  canBeShownProjects = Enumerable.from(canBeShownProjects)
    .where((x) => x.projectId != firstProject.projectId)
    .toArray()

  const secondProjectRandomIndex = integerRandomNumberExcludedMax(
    0,
    canBeShownProjects.length
  )

  const secondProject = canBeShownProjects[secondProjectRandomIndex]

  const currentPairIndex = userVotesData.length + 1

  userVotesData.push({
    pairIndex: currentPairIndex,
    firstProjectId: firstProject.projectId,
    secondProjectId: secondProject.projectId,
    status: "displayed",
    votedProjectId: 0,
    vote: 0,
  })

  if ((await UsersData.countDocuments({ address: userAddress })) == 0)
    await UsersData.insertMany([
      {
        address: userAddress,
        votes: userVotesData,
      },
    ])
  else
    await UsersData.findOneAndUpdate(
      { address: userAddress },
      {
        votes: userVotesData,
      }
    )

  return {
    pairIndex: currentPairIndex,
    firstProject: firstProject,
    secondProject: secondProject,
  }
}

async function getUserScore(userAddress) {
  let score = await Scores.findOne({ address: userAddress })

  if (score == null && process.env.MODE == "test")
    score = { address: userAddress, score: 100, normalizedScore: 0.1 }

  return score
}

export default router
