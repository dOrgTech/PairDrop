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

## Environment variables

```
MORALIS_APYKEY=
ETHERSCAN_OPTIMISM_APIKEY=
ETHERSCAN_MAINNET_APIKEY=
SUBGRAPH_APYKEY=
POAP_APIKEY=
```