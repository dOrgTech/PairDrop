import * as dotenv from "dotenv"
import json2csv from "json2csv"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import mongoose from "mongoose"
import Projects from "./models/db_Projects.js"
import Scores from "./models/db_Scores.js"
import Votes from "./models/db_Votes.js"

dotenv.config()

class Seeder {
  async initialize() {
    console.log("CONNECTING TO MONGODB ATLAS...")

    await mongoose.connect(process.env.ATLAS_URL)

    console.log("CONNECTED TO MONGODB ATLAS")
  }

  #getCurrentPath() {
    const __filename = fileURLToPath(import.meta.url)

    return path.dirname(__filename)
  }

  #getFileContentSync(filePath) {
    return fs.readFileSync(this.#getCurrentPath() + filePath)
  }

  #getJSONFileContentSync(filePath) {
    return JSON.parse(this.#getFileContentSync(filePath))
  }

  #exportDataToJSONFile(filePath, data) {
    fs.writeFileSync(
      this.#getCurrentPath() + filePath,
      JSON.stringify(data, null, 2)
    )
  }

  #exportDataToCSVFile(filePath, data, dataStructure) {
    fs.writeFileSync(
      this.#getCurrentPath() + filePath,
      json2csv.parse(data, dataStructure)
    )
  }

  #exportDataToFileSync(filePath, data, jsonFormat, dataStructure = undefined) {
    const exportedDataFolderPath = this.#getCurrentPath() + "/exportedData"

    if (!fs.existsSync(exportedDataFolderPath))
      fs.mkdirSync(exportedDataFolderPath)

    if (jsonFormat) this.#exportDataToJSONFile(filePath, data)
    else this.#exportDataToCSVFile(filePath, data, dataStructure)
  }

  #logError(data) {
    console.log(`[ERROR] ${data}`)
  }

  async importProjects() {
    if ((await Projects.countDocuments()) > 0) {
      this.#logError("PROJECTS COLLECTION IS NOT EMPTY")

      return
    }

    console.log("ADDING PROJECTS...")

    await Projects.insertMany(
      this.#getJSONFileContentSync("/data/projects.json")
    )

    console.log("PROJECTS ADDED")
  }

  async exportProjects(jsonFormat) {
    if ((await Projects.countDocuments()) == 0) {
      this.#logError("PROJECTS COLLECTION IS EMPTY")

      return
    }

    console.log("EXPORTING PROJECTS...")

    const projectsData = await Projects.find()

    const fields = [
      "projectName",
      "categories",
      "projectDetails",
      "projectMetrics",
      "projectLinks",
      "impactDetails",
      "impactMetrics",
      "funding",
    ]

    const csvDataStructure = { fields }

    await this.#exportDataToFileSync(
      `/exportedData/exportedProjects.${jsonFormat ? "json" : "csv"}`,
      projectsData,
      jsonFormat,
      csvDataStructure
    )

    console.log("PROJECTS EXPORTED")
  }

  async deleteProjects() {
    if ((await Projects.countDocuments()) == 0) {
      this.#logError("PROJECTS COLLECTION IS EMPTY")

      return
    }

    console.log("DELETING PROJECTS...")

    await Projects.deleteMany()

    console.log("PROJECTS DELETED")
  }

  async importScores() {
    if ((await Scores.countDocuments()) > 0) {
      this.#logError("SCORES COLLECTION IS NOT EMPTY")

      return
    }

    console.log("ADDING SCORES...")

    const scoreData = this.#getJSONFileContentSync(
      "/data/OverallNormalized.json"
    )

    let scoreDataToProcess = []

    let scoreDataToProcessCount = 0

    for (let i = 0; i < scoreData.length; i++) {
      scoreDataToProcess.push(scoreData[i])

      scoreDataToProcessCount++

      if (scoreDataToProcessCount == 100000 || i + 1 == scoreData.length) {
        await Scores.insertMany(scoreDataToProcess)

        scoreDataToProcess = []

        scoreDataToProcessCount = 0
      }
    }

    console.log("SCORES ADDED")
  }

  async exportScores() {
    if ((await Scores.countDocuments()) == 0) {
      this.#logError("SCORES COLLECTION IS EMPTY")

      return
    }

    console.log("EXPORTING SCORES...")

    const scoresData = await Scores.find()

    const fields = ["address", "score"]

    const csvDataStructure = { fields }

    await this.#exportDataToFileSync(
      `/exportedData/exportedScores.${jsonFormat ? "json" : "csv"}`,
      scoresData,
      jsonFormat,
      csvDataStructure
    )

    console.log("SCORES EXPORTED")
  }

  async deleteScores() {
    if ((await Scores.countDocuments()) == 0) {
      this.#logError("SCORES COLLECTION IS EMPTY")

      return
    }

    console.log("DELETING SCORES...")

    await Scores.deleteMany()

    console.log("SCORES DELETED")
  }

  async deleteVotes() {
    if ((await Votes.countDocuments()) == 0) {
      this.#logError("VOTES COLLECTION IS EMPTY")

      return
    }

    console.log("DELETING VOTES...")

    await Votes.deleteMany()

    console.log("VOTES DELETED")
  }
}

async function ProcessSeeding() {
  const seeder = new Seeder()

  await seeder.initialize()

  switch (process.argv[2]) {
    case "-ip": {
      await seeder.importProjects()

      break
    }
    case "-epj": {
      await seeder.exportProjects(true)

      break
    }
    case "-epc": {
      await seeder.exportProjects(false)

      break
    }
    case "-dp": {
      await seeder.deleteProjects()

      break
    }
    case "-is": {
      await seeder.importScores()

      break
    }
    case "-esj": {
      await seeder.exportScores(true)

      break
    }
    case "-esc": {
      await seeder.exportScores(false)

      break
    }
    case "-ds": {
      await seeder.deleteScores()

      break
    }
    case "-dv": {
      await seeder.deleteVotes()

      break
    }
  }

  console.log("DISCONNECTING FROM MONGODB ATLAS...")

  await mongoose.disconnect()

  console.log("DISCONNECTED FROM MONGODB ATLAS")
}

ProcessSeeding()
