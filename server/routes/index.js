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
 *                     type: array
 *                     items:
 *                       type: object
 *                       additionalProperties:
 *                         type: number
 *                     example: [{ "Team Size": 500000 }, { "Total Funding": 1000000 }]
 *                   projectSocials:
 *                     type: array
 *                     items:
 *                       type: object
 *                       additionalProperties:
 *                         type: string
 *                     example: [{"twitter":"https://twitter.com/project1"},{"discord":"https://discord.com/invite/project1"},{"github":"https://github.com/project1"}]
 *                   projectLinks:
 *                     type: array
 *                     items:
 *                       type: object
 *                       additionalProperties:
 *                         type: string
 *                     example: [{"Project Overview Video (Youtube)":"https://youtube.com/watch?v=project1"},{"Project website (website)":"https://www.project1.com"},{"Roadmap (document)":"https://www.project1.com/roadmap"}]
 *                   impactDetails:
 *                     type: string
 *                   impactMetrics:
 *                     type: array
 *                     items:
 *                       type: object
 *                       additionalProperties:
 *                         type: number
 *                     example: [{ "Trees Planted": 189320 }, { "Trees Saved": 8930 }]
 *                   funding:
 *                     type: array
 *                     items:
 *                       type: object
 *                       additionalProperties:
 *                         type: number
 *                     example: [{ "Sequoia": 500000 }, { "Paradigm": 1000000 }]
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
