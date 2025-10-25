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
 |- |- setups # auth, report, browser, worker ..etc
 |- tests # Here is the magic 🧙‍♂️
 |- |- ui
 |- |- api
 |- |- db
```

### 🧱 ECH STACK/LIB USED

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

### 🧪 RUN TEST

- Run all test

```
npm run test:all
```

- Run api

```
npm run test:api
```

- Run happy cases

```
npm run test:happy
```

- Generate swagger to api type

```
npm run generated-api
```

- Generate folder index

```
npm run index-generated
```

### 🚀 CI/CD

- Parallel test execution use shard test maxtrix
- Blod report
- Cross-brower

### 📊 RERPORTER

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
