# Setup & Deployment Guide for PairDrop Client

## Introduction

This document provides instructions for setting up and deploying the PairDrop Client, ensuring you can start developing and deploying your version of PairDrop efficiently.

## Prerequisites

Ensure the following tools are installed on your system:

- Node.js (LTS version recommended)
- Yarn or npm (for managing dependencies)

## Step 1: Forking the Repository

Fork the PairDrop client repository to your GitHub account using the GitHub web interface. This will create a copy of the repository in your account, allowing you to make your changes and contributions.

After forking, clone your forked repository to your local machine with the following command in your terminal:

```bash
git clone https://github.com/YOUR_USERNAME/PairDrop.git
cd PairDrop
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 2: Environment Configuration

Create a new file named `.env` by copying the `.env.example` file. Update this new file with your specific environment variables:

```plaintext
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
NEXT_PUBLIC_API_URL=your_api_url_here
```

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: Your WalletConnect project ID for integration, it can be generated from "https://cloud.walletconnect.com/app".
- `NEXT_PUBLIC_API_URL`: This is the URL to your PairDrop API, which can be hosted on services like Heroku or any other platform supporting NodeJS deployments.

## Step 3: Installing Dependencies

Install project dependencies using Yarn or npm. Execute one of the following commands in the project directory:

Using Yarn:

```bash
yarn install
```

Or using npm:

```bash
npm install
```

## Step 4: Running the Development Server

Start the development server to work on the PairDrop client locally. Use the following command:

Using Yarn:

```bash
yarn dev
```

Or using npm:

```bash
npm run dev
```

The client runs in development mode. Access it by navigating to [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Building for Production

Prepare the PairDrop client for deployment by building the project for production:

Using Yarn:

```bash
yarn build
yarn start
```

Or using npm:

```bash
npm run build
npm run start
```

This process creates an optimized production build and serves it, preparing your PairDrop client for deployment.

## Deployment

Deploy the PairDrop client to your preferred hosting service that supports Next.js applications, such as Vercel, Netlify, or any compatible static site hosting service.

## Conclusion

Following these steps will set up and deploy your PairDrop client, making it accessible for users to connect their wallets, vote on projects, and participate in your funding rounds. For further customization and development, refer to the respective documents in the project's documentation directory.
