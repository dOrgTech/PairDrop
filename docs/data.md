# PairDrop Data

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

- Data statistics (normalized):

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

Each data source result data is logarithmically normalized between 1 and 100; then the overall data is normalized between 0 and 0.2 in order to be compatible with the PowerRanker `/server/powerRanker.js`

## Environment variables

```
AXIOS_RETRIES=5
DATAMINER_EAS_SCOREMULTIPLIER=1
DATAMINER_GARDENS_SCOREMULTIPLIER=1
DATAMINER_GITCOINDONATION_SCOREMULTIPLIER=1
DATAMINER_GITCOINPROJECTSOWNERS_SCOREMULTIPLIER=1
DATAMINER_GIVETH_SCOREMULTIPLIER=1
DATAMINER_HOLONYM_SCOREMULTIPLIER=1
DATAMINER_HUMANBOUND_SCOREMULTIPLIER=1
DATAMINER_MIRROR_SCOREMULTIPLIER=1
DATAMINER_POAP_SCOREMULTIPLIER=1.5
DATAMINER_POOLYNFT_SCOREMULTIPLIER=1
DATAMINER_PROOFOFHUMANITY_SCOREMULTIPLIER=1
DATAMINER_ROSSDAO_SCOREMULTIPLIER=1
DATAMINER_UKRAINEDAO_SCOREMULTIPLIER=1
DATAMINER_GIVETH_USDTHRESHOLD=100
DATAMINER_ROSSDAO_ETHTHRESHOLD=45000000000000000
DATAMINER_UKRAINEDAO_ETHTHRESHOLD=45000000000000000
DATAMINER_UKRAINEDAO_STABLECOINTHRESHOLD=100000000
LOGNORMALIZATION_MIN=1
LOGNORMALIZATION_MAX=100
FINALNORMALIZATION_MIN=0
FINALNORMALIZATION_MAX=0.2
MORALIS_APYKEY=
ETHERSCAN_OPTIMISM_APIKEY=
ETHERSCAN_MAINNET_APIKEY=
SUBGRAPH_APYKEY=
POAP_APIKEY=
```
