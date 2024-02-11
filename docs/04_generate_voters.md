# Generating the Voters List for PairDrop

## Introduction

A key component of the PairDrop system is the voters list, which ensures that only eligible participants can vote in the funding rounds. This guide describes how to generate this list using the data provided in the PairDrop data sources and import it into the PairDrop platform.

## Prerequisites

- Access to the PairDrop Server and its databases.
- The data sources file, typically named `OverallNormalized.json`, containing the normalized scores of potential voters based on their on-chain activities.

## Step 1: Preparing the Voters Data

The voters data should be in a JSON format and contain information such as the Ethereum addresses of potential voters and their respective scores or weights. This data is used to determine the voting power of each participant.

## Step 2: Using the Seeder for Voters List

The PairDrop Server includes a seeder script that can import the voters list into the database. Place the `OverallNormalized.json` file in the `/data` directory of the PairDrop Server.

### Import Scores

To import the voters' scores into the `Scores` collection of the database, use the following command:

```bash
node seeder.js -is
```

This command reads from the `OverallNormalized.json` file and imports the data into the database, associating each voter's address with their score.

## Step 3: Verifying the Voters List

After importing the data, verify that the `Scores` collection in the database has been updated with the new entries. Use a MongoDB client or the MongoDB CLI to check the contents of the collection.

## Step 4: Integrating with the PairDrop Client

Once the voters list is imported into the database, the PairDrop client will automatically use this data to determine eligible voters and their voting power. No further integration is required on the client side.

## Conclusion

Generating and importing the voters list into PairDrop is crucial for conducting fair and transparent funding rounds. This process ensures that only eligible participants, based on predefined criteria, can contribute to the decision-making process.
