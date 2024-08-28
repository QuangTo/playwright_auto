# Playwright Automation
Playwright(typescript) framework to cover API & UI scenario. Also present itself reporter, allure, and reportportal

#### TABLE OF CONTENTS

Key takeaway:

- Core handler
- DTO skeleton
- Page object model pattern for UI
- Validate against json schema, yml schema - swagger openAPI3
- Reporting custom
- github CI/CD

#### INSTALL ENV

Before run test scripts make sure that you install node(v20), and playwright latest plugins

```
npm i node
npm i playwright
```

#### RUNNING TEST

```
npm run test:run-dev
```

##### CI/CD

- Using gitlab cicd for running pipelines and automatically trigger when push new change(MRs).
- Deployment on different env stage
- All data will be save in artifacts

#### RERPORTER

Using -- report list integration to mange test results that includes browser, features test and test cases detail

#### Sample Result for chrome and firefox browser
