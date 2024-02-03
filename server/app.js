import * as dotenv from "dotenv"
import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import rateLimit from "express-rate-limit"
import mongoSanatize from "express-mongo-sanitize"
import IndexRouter from "./routes/index.js"
import UserRouter from "./routes/user.js"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

dotenv.config()

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

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: process.env.SERVER_NAME,
      version: process.env.SERVER_VERSION,
      description: "",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
  },
  apis: ["./routes/*.js"],
}

const swaggerSpecs = swaggerJsdoc(swaggerOptions)

expressAPI.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs)
)

expressAPI.use("/", IndexRouter)

expressAPI.use("/user", UserRouter)

mongoose
  .connect(process.env.ATLAS_URL)
  .then(() =>
    expressAPI.listen(process.env.PORT || 5000, () =>
      console.log(`API Server running on port: ${process.env.PORT || 5000}`)
    )
  )
  .catch((error) => console.log(error.message))
