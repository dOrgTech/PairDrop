# PairDrop

PairDrop is an experiment in retroactive public goods funding that directly empowers Ethereum users to allocate ecosystem funds.

Retroactive public goods funding is the concept of rewarding efforts that have already yielded a public benefit. This could address the problems associated with public goods funding, such as uncertainty of future outcomes and reporting/monitoring costs.

Putting this power into the hands of a diverse range of ecosystem participants can make it easier to target areas that are overlooked by centralized allocation bodies.

## Forking PairDrop

Below you will find instructions on how to fork PairDrop so you can use it to distribute funding in your community.

Video walkthrough: https://youtu.be/lHeeqnbutm0

### Documentation:

- [Codebase & Folder Structure](./docs/00_codebase_structure.md)

1. [Setup & Deployment](./docs/01_setup.md)
2. [Customizing the UI](./docs/02_customizing_ui.md)
3. [Adding Projects](./docs/03_adding_projects.md)
4. [Generating the Voters List](./docs/04_generate_voters.md)
5. [Voting](./docs/05_voting.md)
6. [Results](./docs/06_results.md)

- [Server](./docs/server.md)
- [Data](./docs/data.md)

## Codebase & Folder Structure

The PairDrop codebase is structured into distinct directories for the client, server, and data management:

- **Client**: The frontend code, built with NextJS, TypeScript, and Tailwind CSS, is contained within the `client` directory.
- **Server**: The backend operations, APIs, and server logic using Node.js and MongoDB are located in the `server` directory.
- **Data**: Scripts and files for handling data processing are found within the `data` directory.

For a detailed understanding of the codebase, including the roles and contents of specific files and folders, please refer to the **[Codebase & Folder Structure](./docs/00_codebase_structure.md)** documentation.

This organization ensures a clear separation of concerns, simplifies navigation, and supports efficient development and maintenance.

## 1. Getting Started

Before diving into the setup and customization of your PairDrop client, ensure you have the following prerequisites installed:

- Node.js (LTS version)
- Yarn (for dependency management)

Follow the step-by-step guide in the **[Setup & Deployment](./docs/01_setup.md)** documentation to get your PairDrop client up and running. This guide includes instructions on installation, configuration, and deployment.

## 2. Customizing the Client

To make the PairDrop client resonate with your community's identity, refer to the **[Customizing the UI](./docs/02_customizing_ui.md)** documentation. It provides detailed instructions on how to use the provided configuration file to adjust the UI elements, including logos, color schemes, and text.

## 3. Adding Projects

The process of adding projects for voting is streamlined through the use of the PairDrop Server's seeder functionality. Detailed guidance on importing project data into your PairDrop client can be found in **[Adding Projects](./docs/03_adding_projects.md)**.

## 4. Generating Voters List

To ensure a fair and transparent voting process, the PairDrop system utilizes a voters list based on specific criteria. Learn how to generate and import this list by following the steps in **[Generating the Voters List](./docs/04_generate_voters.md)**.

## 5. Voting Process

Engage your community in the voting process with PairDrop's intuitive interface. The **[Voting](./docs/05_voting.md)** documentation explains everything voters need to know, from logging in to casting votes on project pairs.

## 6. Viewing Results

After the voting period ends, results can be analyzed and shared with your community. The **[Results](./docs/06_results.md)** document describes how to access and interpret voting outcomes, ensuring transparency and accountability.

## Server

The PairDrop server plays a crucial role in managing data, processing votes, and calculating results. It includes functionalities for importing and exporting project and voter information, along with a comprehensive API for interactions. For detailed instructions on setting up and managing the server, refer to the **[Server](./docs/server.md)** documentation.

## Data

PairDrop's innovative approach to funding relies on a sophisticated data handling and normalization process to evaluate contributions across the Ethereum ecosystem. This system ensures that funding decisions are data-driven and equitable. To learn more about how PairDrop handles data, including sourcing, normalization, and integration, see the **[Data](./docs/data.md)** documentation.

## License

PairDrop is released under MIT License. Feel free to fork, modify, and use it in your projects.

## Acknowledgements

This project has received funding from [Octant](https://docs.octant.app/), a novel platform for experiments in participatory public goods funding. We are deeply grateful for the Octant community's support.

We are also grateful for the guidance and feedback provided to us by [Daniel Kronovet
](https://twitter.com/kronosapiens), the lead author of the [original BudgetBox paper](https://uploads-ssl.webflow.com/61840fafb9a4c433c1470856/639b50ee30b729cb016806c1_BudgetingBoxes.pdf).
