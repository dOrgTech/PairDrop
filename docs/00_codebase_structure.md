# PairDrop Platform Codebase Structure

## Introduction

The PairDrop platform is structured into three main directories: `client`, `server`, and `data`. Each directory serves a specific purpose in the functionality of the PairDrop ecosystem, housing the necessary files and scripts for operation. Below is an overview of each directory and its contents.

## Client Directory

The `client` directory contains the frontend application of PairDrop, built with Next.js, TypeScript, and TailwindCSS for a responsive and interactive user interface.

- **public:** Stores static assets like images, icons, favicons and the manifest file.
- **src:** The source code for the client application, including pages, components, hooks, config and utilities.
  - **app:** Includes global styles `globals.css`, the main layout wrapper `layout.tsx`, and overall page structure `page.tsx`. It also includes specific pages and their components like `about`, `explore`, `my-votes`, `vote`, and a page for handling 404 errors `not-found.tsx`.
  - **components:** Here you'll find the building blocks of the application's UI, such as the `HomePage` and various reusable UI components and Modals.
  - **context:** Contains React context files like `Web3Modal.tsx` for managing global application state, particularly for handling blockchain-related interactions.
  - **hooks:** A collection of custom React hooks that provide reusable logic for data fetching, managing modals, detecting clicks outside an element, and persisting state across sessions.
  - **providers:** Includes context providers and configuration files, with `swr.tsx` for efficiently managing remote data fetching using SWR (stale-while-revalidate) strategy.
- **.env.example:** An example environment file template.
- **tailwind.config.ts:** TailwindCSS configuration for customizing styles.

## Server Directory

The `server` directory is built with Node.js and MongoDB, comprising the backend logic of PairDrop.

### Overview of the Server Files:

- **models**: This folder contains the Mongoose models for MongoDB, representing the structure of the database collections.
- **routes**: Houses the Express route definitions that the server responds to.
- **root level files**:
  - `.env.example`: A template showcasing the required environment variables for server configuration.
  - `app.js`: The entry point of the server application setting up middleware, routes, database connections, and the server itself.
  - `powerRanker.js`: Contains the logic for the ranking algorithm, which might be used for ordering projects based on votes.
  - `seeder.js`: A utility script for seeding the database with initial data or for data migration tasks.
  - `tools.js`: A collection of utility functions that may be used across different parts of the application.

## Data Directory

The `data` directory holds scripts and tools for sourcing, normalizing, and processing the data used in PairDrop.

- **scripts:** Includes various scripts for data mining and normalization.
  - **dataMinersOutput:** Stores the output from data mining scripts.
  - **duneData:** Contains data fetched from Dune Analytics.

## Documentation

For an in-depth understanding of each section's documentation, refer to the `README.md` located in the main directory ([README.md](./../README.md)). This file provides detailed instructions and information about the codebase, including setup, customization, and usage guides.
