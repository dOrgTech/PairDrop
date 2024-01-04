import mongoose from "mongoose"

const voteSchema = new mongoose.Schema({
  address: String,
  project1Id: Number,
  project2Id: Number,
  vote: Number
})

const Votes = mongoose.model("Votes", voteSchema)

export default Votes
