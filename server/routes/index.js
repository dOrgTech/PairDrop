import express from "express"
import Projects from "../models/db_Projects.js"

const router = express.Router()

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Retrieves the list of projects.
 *     description: Retrieves the list of projects
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   projectId:
 *                     type: integer
 *                     description: Project unique identifier
 *                     example: 1
 *                   projectName:
 *                     type: string
 *                     description: Name of the project
 *                     example: Lorem Ipsum Project
 *                   projectIcon:
 *                     type: string
 *                     description: Base 64 encoded image
 *                     example: base64EncodedString.128x128
 *                   categories:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: education
 *                   projectDetails:
 *                     type: string
 *                     description: Project description
 *                     example: Lorem ipsum dolor sit amet, consectetur adipiscing elit...
 *                   projectMetrics:
 *                     type: object
 *                     properties:
 *                       teamSize:
 *                         type: integer
 *                         example: 10
 *                       totalFunding:
 *                         type: number
 *                         example: 500000
 *                   projectLinks:
 *                     type: object
 *                     properties:
 *                       twitter:
 *                         type: string
 *                         example: https://twitter.com/example
 *                       discord:
 *                         type: string
 *                         example: https://discord1.com/invite/example
 *                       github:
 *                         type: string
 *                         example: https://github.com/example
 *                       youtubeVideoOverview:
 *                         type: string
 *                         example: https://youtube.com/watch?v=example
 *                       website:
 *                         type: string
 *                         example: https://www.example.com
 *                       roadmap:
 *                         type: string
 *                         example: https://www.example.com/roadmap
 *                   impactDetails:
 *                     type: string
 *                   impactMetrics:
 *                     type: object
 *                     properties:
 *                       metric1:
 *                         type: string
 *                       metric2:
 *                         type: string
 *                   funding:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         fundingSource:
 *                           type: string
 *                           example: Source A
 *                         fundingAmount:
 *                           type: number
 *                           example: 300000
 *                   score:
 *                     type: number
 *                     example: 23.09  
 *       500:
 *         description: Error getting projects data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.get("/projects", async function (req, res, next) {
  try {
    const projects = await Projects.find()

    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
