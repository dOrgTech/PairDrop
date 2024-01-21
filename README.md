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
- Raw data statistics (before normalization):
```
Min score: 1
Max score: 149
Average score: 3.1815632667367684
Below average wallets count: 2387
Above average wallets count: 466
```

### Gitcoin Donation
Processes all donations of at least 100$.

- Data source type: `Dune`
- Score before log norm: `+1 for each contribution above 100$`
- Multiplier: `1`
- Raw data statistics (before normalization):
```
Min score: 1
Max score: 12
Average score: 1.1938527084601338
Below average wallets count: 2840
Above average wallets count: 446
```

### EAS (Ethereum Attestation Service)
Processes all minted EAS attestations.

- Data source type: `Dune`
- Score before log norm: `+1 for each attestation`
- Multiplier: `1`
- Raw data statistics (before normalization):
```
Min score: 1
Max score: 257
Average score: 1.6967090137835008
Below average wallets count: 67206
Above average wallets count: 25441
```

### Gitcoin Projects Owners
Processes all projects creators.

- Data source type: `Moralis`
- Score before log norm: `+1 for each project creation`
- Multiplier: `1`
- Raw data statistics (before normalization):
```
Min score: 1
Max score: 7
Average score: 1.0813076278290026
Below average wallets count: 1113
Above average wallets count: 80
```

### Giveth Donation
Processes all donations of at least 100$.

- Data source type: `Giveth API`
- Score before log norm: `+1 for each donation above 100$`
- Multiplier: `1`
- Raw data statistics (before normalization):
```
Min score: 1
Max score: 92
Average score: 2.729528535980149
Below average wallets count: 325
Above average wallets count: 78
```

### Holonym
Processes all proofs.

- Data source type: `Etherscan API`
- Score before log norm: `+1 for each proof`
- Multiplier: `1`
- Raw data statistics (before normalization):
```
Min score: 1
Max score: 1588
Average score: 5.009708737864078
Below average wallets count: 411
Above average wallets count: 1
```

### Humanbound
Processes all Humanbound tokens minters.

- Data source type: `Moralis + Etherscan API`
- Score before log norm: `+1 for each minted token`
- Multiplier: `1`
- Raw data statistics (before normalization):
```
Min score: 1
Max score: 23
Average score: 1.766839378238342
Below average wallets count: 131
Above average wallets count: 62
```

### Mirror
Processes all NFTs minters.

- Data source type: `Mirror API`
- Score before log norm: `+1 for each minted token`
- Multiplier: `1`
- Raw data statistics (before normalization):
```
Min score: 1
Max score: 701
Average score: 1.9749258160237388
Below average wallets count: 4942
Above average wallets count: 1798
```

### POAP
Processes POAP events that have at least 4k of supply.

- Data source type: `POAP.gallery API + POAP API`
- Score before log norm: `+1 for each owned POAP`
- Multiplier: `1.5`
- Raw data statistics (before normalization):
```
Min score: 1
Max score: 528
Average score: 2.2107264741856048
Below average wallets count: 457772
Above average wallets count: 95737
```

### Pooly NFT
Processes all NFTs minters.

- Data source type: `Moralis`
- Score before log norm: `+1 for each owned POOLY`
- Multiplier: `1`
- Raw data statistics (before normalization):
```
Min score: 1
Max score: 20
Average score: 1.1311369509043927
Below average wallets count: 5762
Above average wallets count: 430
```

### Proof of Humanity
Processes all submissions.

- Data source type: `Subgraph API`
- Score before log norm: `+1 for each registered submission (approved submission)`
- Multiplier: `1`
- Raw data statistics (before normalization):
```
Min score: 1
Max score: 53
Average score: 1.0034291119782428
Below average wallets count: 16911
Above average wallets count: 3
```

### RossDAO
Processes all donations of at least 100$.

- Data source type: `Safe API`
- Score before log norm: `+1 for each contribution above 100$`
- Multiplier: `1`
- Raw data statistics (before normalization):
```
Min score: 1
Max score: 6
Average score: 1.0901451489686784
Below average wallets count: 1214
Above average wallets count: 95
```

### UkraineDAO
Processes all donations of at least 100$.

- Data source type: `Safe API`
- Score before log norm: `+1 for each contribution above 100$`
- Multiplier: `1`
- Raw data statistics (before normalization):
```
Min score: 1
Max score: 9
Average score: 1.1545064377682404
Below average wallets count: 427
Above average wallets count: 39
```

### Overall data
- Raw data statistics (before normalization):
```
Min score: 23.488451689160573
Max score: 456.47755958286297
Average score: 46.28210643577585
Below average wallets count: 478662
Above average wallets count: 174117
```

## Data generation and statistics
Generates and normalizes data of all data sources with the following command:
```
npm run generate
```

Only normalizes data of all data sources with the following command:
```
npm run onlynormalize
```

Generates statistics of the specified data file with the following command:
```
npm run stats FILENAME_IN_DATAMINERSOUTPUT
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