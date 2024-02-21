# Adding Projects to PairDrop

## Introduction

Adding projects to your PairDrop platform is a critical step in setting up your funding round. This guide details the process of using the PairDrop Server's seeder functionality to import project data into your PairDrop client, accommodating dynamic data fields to ensure flexibility and customization.

## Prerequisites

Before you begin, ensure you have access to the PairDrop Server and have the project data ready in a compatible JSON format.

## Step 1: Preparing Project Data

Prepare your project data according to the PairDrop data schema. While certain fields such as projectName and projectDetails are standard, PairDrop also supports dynamic fields. This means you can include as many key-value pairs as you want for certain sections. These dynamic fields include `projectMetrics`, `projectSocials`, `projectLinks`, `impactMetrics`, and `funding`. Each of these sections can contain an array of objects, with each object representing a key-value pair. Some keys will be rendered as text on the frontend (FE), and the value will either be rendered as text or linked to the key text, providing a flexible way to display project data dynamically. Additionally, the projectIcon must be in base64 PNG format string `data:image/png;base64,` with a recommended dimension of 128x128 pixels.

Save this data in a file named `projects.json` and place it inside the `/data` directory of the PairDrop Server.

A full example projects JSON can be found here: [projects.json](../client/public/projects.json), an example of a project JSON structure accommodating dynamic data is provided below:

```json
[
  {
    "projectId": 1,
    "projectName": "Example Project",
    "projectIcon": "data:image/png;base64,",
    "categories": ["Category 1", "Category 2"],
    "projectDetails": "Detailed description of the project...",
    "projectMetrics": [
      { "Key": "Value" },
      { "Another Key": "Another Value" }
    ],
   "projectSocials": [
      { "twitter": "https://twitter.com/example" },
      { "discord": "https://discord.com/invite/example" },
      { "github": "https://github.com/example" }
    ],
    "projectLinks": [
      { "Project video": "https://youtube.com/watch?v=example" },
      { "Project website": "https://www.example.com" },
      { "Roadmap": "https://www.example.com/roadmap" }
    ],
    "impactDetails": "Detailed impact description...",
    "impactMetrics": [
      { "Impact Key": "Impact Value" }
      { "Another Impact Key": "Another Impact Value" }
    ],
    "funding": [
      { "Investor Name": 100000 }
      { "Another Investor Name": 200000 }
    ],
    "score": 0
  }
]
```

## Step 2: Using the Seeder

Navigate to the server directory where the PairDrop Server is located. The seeder script is used to import, export, or delete project data from the database.

### Import Projects

To import projects into the PairDrop database, run the following command in the terminal:

```bash
node seeder.js -ip
```

This command reads from the `projects.json` file (placed in the `/data` directory) and imports the projects into the `Projects` collection in your database.

### Verify Import

After running the import command, verify that the projects have been successfully added to the database. You can use a MongoDB client to check the `Projects` collection for the new entries. Additionally, you can verify the successful import by accessing the `API_URL` endpoint `/projects` on your PairDrop server. This method provides a straightforward way to visually confirm that the projects are correctly listed in the system.

## Step 3: Updating the PairDrop Client

Once the projects are imported into the database, the PairDrop client will automatically have access to this data through the API endpoints provided by the PairDrop Server. No additional steps are required on the client side to display the newly added projects, including any dynamic data fields.
