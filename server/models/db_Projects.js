import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
  projectId: Number,
  projectName: String,
  projectIcon: String,
  categories: [String],
  projectDetails: String,
  projectMetrics: [
    {
      type: Map,
      of: Number,
    },
  ],
  projectSocials: [
    {
      type: Map,
      of: String,
    },
  ],
  projectLinks: [
    {
      type: Map,
      of: String,
    },
  ],
  impactDetails: String,
  impactMetrics: [
    {
      type: Map,
      of: Number,
    },
  ],
  funding: [
    {
      type: Map,
      of: Number,
    },
  ],
  score: Number,
})

const Projects = mongoose.model("Projects", projectSchema)

export default Projects
