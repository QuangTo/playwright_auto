# 🎭 Playwright Automation Demo

Playwright(typescript) framework to cover API & UI scenario. Leverage with generator some tools. Easy coding

#### 📁 STRUCTURE

```
 |- config # Configuration
 |- external # External system interactions e.g. Database
 |- src
 |- |- core #
 |- |- |- api #
 |- |- |- ui #
 |- |- |- shared #
 |- |- setups #
 |- tests # Here is the magic 🧙‍♂️
 |- |- ui
 |- |- api
```

### RUN TEST

```
npx playwright test
```

### ENVIRONMENTS

Ability to run cross environments sample here is dev and qa env using dotenv <br>

- DEV <br>
- QA <br>

### API

Based on swagger file, we extract and validate api schema.

1. Generate to ts schema type
   <!-- 3. Convert to zod schema -->
   <!-- 3. Use mock data base on zod schema || use faker to build data -->
2. (cohere-ai) generate test cases base on schema and endpoint

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
npx openapi-typescript https://petstore3.swagger.io/api/v3/openapi.json  -o src/core/api/types/pet-type.ts --immutable --root-types true --export-type
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
