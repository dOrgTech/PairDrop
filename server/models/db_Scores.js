import mongoose from "mongoose"
import { ProjectSchema } from "./db_Projects.js"

const scoreSchema = mongoose.Schema({
  address: String,
  score: Number,
  projects: [ProjectSchema],
})

const Scores = mongoose.model("Scores", scoreSchema)

export default Scores
