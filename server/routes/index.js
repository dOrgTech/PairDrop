import express from "express"
import Projects from "../models/db_Projects.js"

const router = express.Router()

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Retrieve the list of projects.
 *     description: Retrieve the list of projects.
 *     responses:
 *       200:
 *         description: A list of projects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   projectName:
 *                     type: string
 *                     description: Name of the project.
 *                     example: Lorem Ipsum Project
 *                   projectIcon:
 *                     type: string
 *                     description: Base 64 encoded image.
 *                     example: base64EncodedString.128x128
 */
router.get("/projects", async function (req, res, next) {
  try {
    const projects = await Projects.find()

    res.status(200).json(projects)
  } catch (error) {
    res.status(504).json({ message: error.message })
  }
})

export default router
