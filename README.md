# 🎭 Playwright Automation 🎭

- Scalable, rubost and maintainable testing framework
- Pyramid testing model
- Focus on integration level aim to test regression & smoke

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
 |- project config
```

### 🧱 TECH STACK/LIB USED

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
### SETUP
```
npm i
```

### 🧪 RUN TEST

(Test are now run success without env file)

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

- Generate index folder

```
npm run index-generated
```

### 🚀 CI/CD

- Parallel test execution use shard test maxtrix
- Blod report (shard and merge report)
- Cross-brower
- Easy setup, test with pipline (s3,azure)

### 📊 RERPORTER

default html

```
npx playwright show-report
```

report-portal docker

- Run docker-compose -p reportportal up -d --force-recreate
- Open localhost port :8080
- Login with credential : superadmin - erebus
- Update RP info on src/setup/report/RPconfig.ts (apiKey,endpoint)
- Update reporter on playwright.config.ts file
