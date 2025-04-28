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

- Auto generate API with OpenAPI Generator
- Validate API schema with ajv (zod)
- Custom fixture, test, expect for UI
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
npm run test:dev-api
```

### ENVIRONMENTS

Ability to run cross env. sample here is dev and qa env using dotenv <br>

- dev <br>
- qa <br>

#### RERPORTER

default

```
npm run test:dev-api
```

allure

```
allure generate ./allure-results -o ./allure-report --clean
allure open ./allure-report
```

#### Open-API Generator

Install

```
npm install -D openapi-typescript
```

Auto Genarate API type

```
npx openapi-typescript https://automationintesting.online/auth/v3/api-docs/auth-api  -o src/api/types/auth.d.ts

- swagger 3 - the best
npx openapi-zod-client https://petstore3.swagger.io/api/v3/openapi.json -o src/core/api/schema/zodiosClient.ts

npx openapi-typescript https://petstore3.swagger.io/api/v3/openapi.json --schema -o src/core/api/schema/auth-api.schema.json

```
