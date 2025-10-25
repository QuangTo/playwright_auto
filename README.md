# 🎭 Playwright Automation 🎭

- Scalable, rubost and maintainable testing framework
- Apply diamon test model

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

### TECH STACK/LIB USED

- Playwright for API, UI, mobile simulator device testing
- Appium for mobile testing
- Artillery (or k6) for load testing
- ESlint for pinpoint issues and guide you in rectifying potential problems TypeScript.
- Prettier for fortmat coding
- Dotnet env management
- Secret for aws loading secret key
- Typescript for type safe
- Zod for schema validation
- openapi-typescript for generator api type
- Wiston for logging
- Faker for genarating test data

### RUN TEST

```
npx playwright test
```

### API

Based on swagger file, we extract and validate api schema.

1. Generate to ts schema type
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

playwright html default

```
npx playwright show-report
```

For using report-portal

```
 Update reporter on playwright.config.ts file
 Run docker-compose -p reportportal up -d --force-recreate
 Open localhost port :8080
 Credential : superadmin - erebus
```
