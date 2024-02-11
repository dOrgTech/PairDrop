# Adding Projects to PairDrop

## Introduction

Adding projects to your PairDrop platform is a critical step in setting up your funding round. This guide details the process of using the PairDrop Server's seeder functionality to import project data into your PairDrop client.

## Prerequisites

Before you begin, ensure you have access to the PairDrop Server and have the project data ready in a compatible format (typically JSON or CSV).

## Step 1: Preparing Project Data

Prepare your project data according to the PairDrop data schema. The required schema typically includes fields such as project name, description, website URL, and funding goal. Save this data in a file named `projects.json` and place it inside the `/data` directory of the PairDrop Server.

An example projects JSON can be found here: [projects.json](../client/public/projects.json)

## Step 2: Using the Seeder

Navigate to the server directory where the PairDrop Server is located. The seeder script is used to import, export, or delete project data from the database.

### Import Projects

To import projects into the PairDrop database, run the following command in the terminal:

```bash
node seeder.js -ip
```

This command reads from the `projects.json` file (placed in the `/data` directory) and imports the projects into the `Projects` collection in your database.

### Verify Import

After running the import command, verify that the projects have been successfully added to the database. You can use a MongoDB client to check the `Projects` collection for the new entries.

## Step 3: Updating the PairDrop Client

Once the projects are imported into the database, the PairDrop client will automatically have access to this data through the API endpoints provided by the PairDrop Server. No additional steps are required on the client side to display the newly added projects.
