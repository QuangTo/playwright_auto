# Playwright Automation

Playwright(typescript) framework to cover API & UI scenario. Also present itself reporter, allure, and reportportal

#### TABLE OF CONTENTS

Key take-away:

- [Test automation framework package](#test-framework)
- [Install](#install)
- [Running sample test](#running-test)
- [CI-CD-Cross env](#environments)
- [Discover reporter](#rerporter)

### TEST FRAMEWORK

Design

package <br>

```
root
├── lib
│ ├── assert
│ ├── dataFactory
│ └── utils
├── src
│ ├── components
│ │ ├── POM
│ │ |  ├── fixtures
│ │ ├── DOM
│ │ └── utils
│ ├── services
│ │ ├── core
│ │ └── DTO
│ ├── database
│ │ ├── core
│ │ └── utlis
│ ├── utils
│ │ ├── formatDate
│ │ └── CURL
│ ├── helpers
│ └── dataFactory
├── tests
│ ├── ui
│ │ ├── features
│ │ ├──  test.spec.ts
│ │ └── data-test
│ ├── api
│ │ ├──  test.spec.ts
│ │ └── data-test
├── tests-setup
│ ├── global
│ ├── reporter
├── package.json
├── config.ts
└── README.md
```

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
