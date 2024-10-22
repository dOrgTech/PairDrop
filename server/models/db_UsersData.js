import mongoose from "mongoose"

const userDataSchema = new mongoose.Schema({
  address: String,
  votes: [
    {
      pairIndex: Number,
      firstProjectId: Number,
      secondProjectId: Number,
      status: String,
      votedProjectId: Number,
      vote: Number
    },
  ],
})

const UsersData = mongoose.model("UsersData", userDataSchema)

export default UsersData
