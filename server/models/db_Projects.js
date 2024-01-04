import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
  projectId: Number,
  projectName: String,
  projectIcon: String,
  categories: [String],
  projectDetails: String,
  projectMetrics: {
    teamSize: Number,
    totalFunding: Number,
  },
  projectLinks: {
    twitter: String,
    discord: String,
    github: String,
    youtubeVideoOverview: String,
    website: String,
    roadmap: String,
  },
  impactDetails: String,
  impactMetrics: {
    metric1: String,
    metric2: String,
  },
  funding: [
    {
      fundingSource: String,
      fundingAmount: Number,
    },
  ],
  score: Number
})

const Projects = mongoose.model("Projects", projectSchema)

export default Projects