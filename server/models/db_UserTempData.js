import mongoose from "mongoose"

const userTempDataSchema = new mongoose.Schema({
  address: String,
  displayedProject1Id: Number,
  displayedProject2Id: Number,
})

const UserTempData = mongoose.model("UserTempData", userTempDataSchema)

export default UserTempData
