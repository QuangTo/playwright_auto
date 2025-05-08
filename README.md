# Playwright Automation

Playwright(typescript) framework to cover API & UI scenario. Leverage with generator some tools. Easy coding

#### TABLE OF CONTENTS

- [Install](#install)
- [Running sample test](#running-test)
- [Setup Cross env](#environments)
- [OpenApi Specification](#OPENAPI)
- [Discover reporter](#rerporter)

#### INSTALL

Before run test scripts make sure that you install node(v20), and playwright latest plugins

```
git clone git@github.com:QuangTo/playwright_auto.git
npm i
```

#### RUNNING TEST

```
npm run test:dev
```

### ENVIRONMENTS

Ability to run cross env. sample here is dev and qa env using dotenv <br>

- dev <br>
- qa <br>

### OPENAPI

Validate Swagger OpenAPI 3.0 & 3.1 (aka OAS)

1. Check api version  changes
2. Generate to ts schema type
3. Convert to zod schema
4. Use mock data base on zod schema
5. (AI - upcoming) generate happy cases base on schema and endpoint

Sample

```
OpenAPI 3.1(aka OAS):
https://petstore31.swagger.io/api/v31/openapi.json
```

Install

```
npm install -D openapi-typescript zod
```

```
npx openapi-typescript https://petstore3.swagger.io/api/v3/openapi.json  -o src/api/schema/openApiType.d.ts
```

convert to zod schema

```
npx openapi-zod-client https://petstore3.swagger.io/api/v3/openapi.json -o src/api/schema/zodShema.ts
```

Mock data:

```
@anatine/zod-mock
```

#### RERPORTER

default

```
npx playwright show-report
```

allure

```
allure generate ./allure-results -o ./allure-report --clean
allure open ./allure-report
```
