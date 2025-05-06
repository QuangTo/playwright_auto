# Playwright Automation Advance

aka pw-adv

Playwright(typescript) framework to cover API & UI scenario. Also present itself reporter, allure, and reportportal

#### TABLE OF CONTENTS

Key take-away:

- [Test automation framework package](#test-framework)
- [Install](#install)
- [Running sample test](#running-test)
- [CI-CD-Cross env](#environments)
- [Discover reporter](#rerporter)
- [Open-API Generator](#open-api-generator)

### TEST FRAMEWORK

Test design:

- Auto generate API Schema Type with OpenAPI-typescript
- Convert to zod schema
- Validate API schema (zod/ajv)
- Custom fixture, test, expect
- Github CI/CD
- Project config

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

#### RERPORTER

default

```
npm run test:dev
```

allure

```
allure generate ./allure-results -o ./allure-report --clean
allure open ./allure-report
```

## API Specification

- (Swagger)OpenAPI 3.0 & (OAS)3.1

Format:

- JSON Schema

### Tool/ Lib

##### JSON Schema Validator

Sample OPENAPI

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

Mock data: @anatine/zod-mock
Type: openapi-types

openapi-diff : identify the differences of version
