# 🎭 PLAYWRIGHT FRAMEWORK 🎭

- Scalable, rubost and maintainable testing framework
- API, UI ,i18, axe
- Focus on integration, regresstion test

### 📁PROJECT STRUCTURE

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

- Page object model & components object model for UI
- Service api layer
- Fixture, custom fixture for local and ci
- Builder data pattern
- Factory object pattern

### 🧪RUN TEST

Install dependecies

```
npm i
```

Run all test

```
npm i test:all
```

Run with tag/ project

```
npm i test:api
```

Run UI project

```
npm i test:happy
```

Generate service type base on swagger file

```
npm i generated-api
```

Generate index file

```
npm i index-generated
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

### API Explain

Based on swagger file, we will leverage openapi-typescript then extract to {pet}.d.ts file. 

``` Sample
npx openapi-typescript https://petstore3.swagger.io/api/v3/openapi.json  -o src/core/api/types/pet-type.ts --immutable --root-types true --export-type
```
Ideally generated-api cli should auto run to validate api changes. this way help auto repo alway up-to-date with other services.
{pet}.d.ts file help us easilly to validate request schema on test case

Some other useful tools

- Mock schema data @anatine/zod-mock
- Generate client with @moznion/openapi-fetch-gen

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
