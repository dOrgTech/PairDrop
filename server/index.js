import * as dotenv from "dotenv"
import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import rateLimit from "express-rate-limit"
import mongoSanatize from "express-mongo-sanitize"
import validator from "express-validator"
import Web3Token from "web3-token"
import Scores from "./models/db_Scores.js"
import { Projects } from "./models/db_Projects.js"

dotenv.config()

const { check, validationResult } = validator

class API {
  async initialize() {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 50,
      standardHeaders: true,
      legacyHeaders: false,
    })

    const expressAPI = express()

    expressAPI.use(mongoSanatize())

    expressAPI.use(bodyParser.json({ limit: "30mb" }))

    expressAPI.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

    expressAPI.use(cors())

    expressAPI.use(helmet())

    expressAPI.use(compression())

    expressAPI.use(limiter)

    expressAPI.get("/score/:id", this.#getScore)

    expressAPI.get("/projects", this.#getProjects)

    mongoose
      .connect(process.env.ATLAS_URL)
      .then(() =>
        expressAPI.listen(process.env.API_PORT, () =>
          console.log(`API Server running on port: ${process.env.API_PORT}`)
        )
      )
      .catch((error) => console.log(error.message))
  }

  async #getScore(req, res) {
    const { id: _id } = req.params

    try {
      const token = req.headers["auth"]

      const { address, body } = await Web3Token.verify(token)

      if (
        address.toLowerCase() == _id.toLowerCase() &&
        body.statement == "This is a signed message"
      ) {
        try {
          const score = await Scores.findOne({ account: _id })

          res.status(200).json(score)
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      } else {
        res.status(401).json({ message: "Unauthorized User" })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async #getProjects(req, res) {
    try {
      const projects = await Projects.find()

      res.status(200).json(projects)
    } catch (error) {
      res.status(504).json({ message: error.message })
    }
  }
}

async function StartServer() {
  const api = new API()

  api.initialize()
}

StartServer()
