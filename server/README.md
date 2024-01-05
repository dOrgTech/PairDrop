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