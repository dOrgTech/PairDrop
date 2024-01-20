import mongoose from "mongoose"

const scoreSchema = new mongoose.Schema({
  address: String,
  score: Number,
  normalizedScore: Number
})

const Scores = mongoose.model("Scores", scoreSchema)

export default Scores
