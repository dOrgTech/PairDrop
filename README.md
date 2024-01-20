# Pair2Pair
Pair2Pair is an experiment in retroactive public goods funding that directly empowers Ethereum users to allocate ecosystem funds.

Retroactive public goods funding is the concept of rewarding efforts that have already yielded a public benefit. This could address the problems associated with public goods funding, such as uncertainty of future outcomes and reporting/monitoring costs.

Putting this power into the hands of a diverse range of ecosystem participants can make it easier to target areas that are overlooked by centralized allocation bodies.



# Pair2Pair Client
TODO



# Pair2Pair Server

## Seeder
Handles the import/export/deletion of data, the following commands are to be run inside the server folder.


### Import projects
Imports projects data from `/data/projects.json` to `Projects` collection (skips if the collection is not empty).

```
node seeder.js -ip
```

### Export projects
Exports projects data from `Projects` collection to file (skips if the collection is empty).

Can export to `/exportedData/exportedProjects.json` using JSON format, with the following command:
```
node seeder.js -epj
```

Can export to `/exportedData/exportedProjects.csv` using CSV format, with the following command:
```
node seeder.js -epc
```

### Delete projects
Deletes projects data from `Projects` collection (skips if the collection is empty).

```
node seeder.js -dp
```

### Import scores
Imports scores data from `/data/OverallNormalized.json` to `Scores` collection (skips if the collection is not empty).

```
node seeder.js -is
```

### Export scores
Exports scores data from `Scores` collection to file (skips if the collection is empty).

Can export to `/exportedData/exportedScores.json` using JSON format, with the following command:
```
node seeder.js -esj
```

Can export to `/exportedData/exportedScores.csv` using CSV format, with the following command:
```
node seeder.js -esc
```

### Delete scores
Deletes scores data from `Scores` collection (skips if the collection is empty).

```
node seeder.js -ds
```

### Delete votes
Deletes votes data from `Votes` collection (skips if the collection is empty).

```
node seeder.js -dv
```

## API
Pair2Pair backend, can be started using `npm start` (for production) or `npm test` (for testing/development).

The API documentation is implemented through Swagger and it's accessible at `/api-docs`.

Provides the following endpoints:

- **GET** `/projects`: Gets the projects list.
- **GET** `/user/score`: Gets the logged-in user's score data.
- **GET** `/user/get-random-project-pair`: Generates and gets a random projects pair for voting (for logged-in users).
- **POST** `/user/vote`: Adds the user vote (for logged-in users).
- **PATCH** `/user/vote`: Edits the user vote (for logged-in users).

## Environment variables

```
ATLAS_URL=MONGO_DB_CONNECTION_URL
API_PORT=API_SERVER_PORT
```



# Pair2Pair Data

## Data sources

### Gardens
Processes all Gardens that have at least 10 proposals, like 1HIVE, TOKEN ENGINEERING COMMONS, BrightDAO etc…

- Data source type: `Subgraph`
- Score before log norm: `+1 for each stake to proposal (no amount checked, just the action)`
- Multiplier: `1`

### Gitcoin Donation
Processes all donations of at least 100$.

- Data source type: `Dune`
- Score before log norm: `+1 for each contribution above 100$`
- Multiplier: `1`

### EAS (Ethereum Attestation Service)
Processes all minted EAS attestations.

- Data source type: `Dune`
- Score before log norm: `+1 for each attestation`
- Multiplier: `1`

### Gitcoin Projects Owners
Processes all projects creators.

- Data source type: `Moralis`
- Score before log norm: `+1 for each project creation`
- Multiplier: `1`

### Giveth Donation
Processes all donations of at least 100$.

- Data source type: `Giveth API`
- Score before log norm: `+1 for each donation above 100$`
- Multiplier: `1`

### Holonym
Processes all proofs.

- Data source type: `Etherscan API`
- Score before log norm: `+1 for each proof`
- Multiplier: `1`

### Humanbound
Processes all Humanbound tokens minters.

- Data source type: `Moralis + Etherscan API`
- Score before log norm: `+1 for each minted token`
- Multiplier: `1`

### Mirror
Processes all NFTs minters.

- Data source type: `Mirror API`
- Score before log norm: `+1 for each minted token`
- Multiplier: `1`

### POAP
Processes POAP events that have at least 4k of supply.

- Data source type: `POAP.gallery API + POAP API`
- Score before log norm: `+1 for each owned POAP`
- Multiplier: `1.5`

### Pooly NFT
Processes all NFTs minters.

- Data source type: `Moralis`
- Score before log norm: `+1 for each owned POOLY`
- Multiplier: `1`

### Proof of Humanity
Processes all submissions.

- Data source type: `Subgraph API`
- Score before log norm: `+1 for each registered submission (approved submission)`
- Multiplier: `1`

### RossDAO
Processes all donations of at least 100$.

- Data source type: `Safe API`
- Score before log norm: `+1 for each contribution above 100$`
- Multiplier: `1`

### UkraineDAO
Processes all donations of at least 100$.

- Data source type: `Safe API`
- Score before log norm: `+1 for each contribution above 100$`
- Multiplier: `1`

## Data generation

```
npm start
```

## Data normalization
Each data source result data is logarithmically normalized between 1 and 100; then the overall data is normalized between 0 and 0.5 in order to be compatible with the PowerRanker `/server/powerRanker.js`

## Environment variables

```
MORALIS_APYKEY=
ETHERSCAN_OPTIMISM_APIKEY=
ETHERSCAN_MAINNET_APIKEY=
SUBGRAPH_APYKEY=
POAP_APIKEY=
```