# 🎭 Playwright Automation Demo

Playwright(typescript) framework to cover API & UI scenario. Leverage with generator some tools. Easy coding

#### TABLE OF CONTENTS

- [Running sample test](#runtest)
- [Setup Cross env](#environments)
- [API](#api)
- [UI](#UI)
- [Discover reporter](#rerporter)

### RUN TEST

```
npm run test:dev
```

### ENVIRONMENTS

Ability to run cross environments sample here is dev and qa env using dotenv <br>

- DEV <br>
- QA <br>

### API

Based on swagger file, we extract and validate api schema.

1. Check api version changes
2. Generate to ts schema type
   <!-- 3. Convert to zod schema -->
   <!-- 3. Use mock data base on zod schema || use faker to build data -->
3. (AI - upcoming) generate happy cases base on schema and endpoint

Sample

```
OpenAPI 3():
https://petstore31.swagger.io/api/v3/openapi.json
```

Install

```
npm install -D openapi-typescript zod
```

```
npx openapi-typescript https://petstore3.swagger.io/api/v3/openapi.json  -o src/api/types/petStoreType.d.ts --immutable --root-types true --export-type
```

Mock data:

```
@anatine/zod-mock
```

<!-- Generated FullAPIClient

```
@moznion/openapi-fetch-gen
npx openapi-fetch-gen -i src/api/Schema/openApiType.d.ts -o src/api/Schema/generatedClient.ts
``` -->

#### UI

- POM, Builder, Page Factory pattern
- Custom fixture, fixtures for local and workers
- Showcase with worker, devices, paralell mode (playwright.config.ts)
- Faker data

#### RERPORTER

```
npx playwright show-report
```
