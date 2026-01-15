# 🎭 PLAYWRIGHT FRAMEWORK 🎭

- Scalable, rubost and maintainable testing framework
- API, UI ,i18, axe
- Focus on integration, regresstion test

### 📁PROJECT STRUCTURE

```
 |- external # External system interactions e.g. Database
 |- .antigravity # AI generator test cases
 |- src
 |- |- core #
 |- |- |- api #
 |- |- |- ui #
 |- |- |- shared # common utils, data
 |- |- |- scripts # define generator flow. can done manual or levarage by ai
 |- |- setups #
 |- tests # Here is the magic 🧙‍♂️
 |- |- ui
 |- |- api
 |- config # Project Configuration
```

### 🧩TECH STACK/LIB

- Playwright for API, UI, mobile simulator device testing
- Appium for mobile testing (not yet)
- Artillery (or k6) for load testing (not yet)
- ESlint for pinpoint issues and guide you in rectifying potential problems TypeScript.
- Prettier for fortmat coding
- Dotnet env management
- Secret for aws loading secret key
- Typescript for type safe
- Zod for schema validation
- openapi-typescript for generator api type
- Wiston for logging 
- Faker for genarating test data
- RenovateBot for auto update dependencies/lib

### 🏗️DESIGN PATTERN

- Page object model, page factory pattern for UI
- Service api layer, builder data pattern
- Fixture, custom fixture for local and ci

### 🧪RUN TEST

Install dependecies

```
npm i
```

Run all test

```
npm run test:all
```

Run with tag/ project

```
npm run test:api
```

Run UI project

```
npm run test:happy
```

Generate service type base on swagger file

```
npm run generated-api
```

Generate index file

```
npm run index-generated
```

### 🧾CODE CONDUCT FLOW

1. Project code convention on tsconfig
2. Use husky to run eslint before commit
3. Prevent `.only` test

### 🧱CODE CONVENTIONS

| Usage                 | Convention   | Sample           |
| --------------------- | ------------ | ---------------- |
| Functions, Variables  | `camelCase`  | `generateData()` |
| Folder & File Names   | `kebab-case` | `user-data.ts`   |
| Classes, Enums, Types | `PascalCase` | `UserType`       |


### AI GENERATOR TEST CASES

Sample for api

```
 following @api-test-generator, write test case for pet service
```
This one leverage ai to generate test case for api service.

### 🚀 CI/CD

- Parallel test execution use shard test maxtrix
- Blod report (shard and merge report)
- Cross-brower
- Easy setup, test with pipline (s3,azure)

### 📊 RERPORTER

Default html

```
npx playwright show-report
```

Docker report-portal

1. Run docker-compose -p reportportal up -d --force-recreate
2. Open localhost port :8080
3. Login with credential : superadmin - erebus
4. Update RP info on src/setup/report/RPconfig.ts (apiKey,endpoint)
5. Update reporter on playwright.config.ts file
