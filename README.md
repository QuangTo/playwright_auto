# Playwright Automation

Playwright(typescript) framework to cover API & UI scenario. Also present itself reporter, allure, and reportportal

#### TABLE OF CONTENTS

Key take-away:

- [Test automation framework package](#test-framework)
- [Install](#install)
- [Running sample test](#running-test)
- [CI-CD-Cross env](#environments)
- [Discover reporter](#rerporter)
- [Open-API Generater](#open-api-generater)

### TEST FRAMEWORK

Design

package <br>

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

#### Open-API Generater

Install

```
npm install -D openapi-typescript
```

Genarate

```
npx openapi-typescript https://automationintesting.online/room/v3/api-docs/room-api  -o src/api/types/room.d.ts

```
