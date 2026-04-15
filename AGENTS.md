# Available Slash Commands

This file defines the available slash commands for interacting with the opencode agents in this project.

## API Test Agents

### @api-agent

Generate or review API test cases following your 6-section structure.

**Usage:**

- `/api-agent generate [service-name] [operation-id]` - Generate new API test cases
- `/api-agent review [test-file-path]` - Review existing API tests for compliance
- `/api-agent enhance [test-file-path]` - Enhance existing API tests with missing scenarios

**Examples:**

- `/api-agent generate pet getPetById`
- `/api-agent review tests/api/pet-api.spec.ts`
- `/api-agent enhance tests/api/pet-api.spec.ts`

## UI Test Agents

### @ui-agent

Generate or review UI test cases following your Page Object Model patterns.

**Usage:**

- `/ui-agent generate [feature-name] [page-name]` - Generate new UI test cases
- `/ui-agent review [test-file-path]` - Review existing UI tests for compliance
- `/ui-agent enhance [test-file-path]` - Enhance existing UI tests

**Examples:**

- `/ui-agent generate login loginPage`
- `/ui-agent review tests/ui/login-ui.spec.ts`
- `/ui-agent enhance tests/ui/login-ui.spec.ts`

## Code Review Agent

### @review-agent

Review code against your project standards and best practices.

**Usage:**

- `/review-agent review [file-path-or-glob]` - General code review
- `/review-agent standards [file-path-or-glob]` - Check coding standards compliance
- `/review-agent tests [test-file-path-or-glob]` - Review test quality

**Examples:**

- `/review-agent review src/`
- `/review-agent standards src/core/api/services/*.ts`
- `/review-agent tests tests/api/pet-api.spec.ts`

## Self-Healing Agent

### @self-healing-agent

Identify flaky tests and add self-healing capabilities.

**Usage:**

- `/self-healing-agent analyze [test-file-path-or-glob]` - Analyze tests for flakiness
- `/self-healing-agent heal [test-file-path-or-glob]` - Apply self-healing fixes
- `/self-healing-agent enhance [test-file-path-or-glob]` - Add self-healing capabilities

**Examples:**

- `/self-healing-agent analyze tests/`
- `/self-healing-agent heal tests/api/pet-api.spec.ts`
- `/self-healing-agent enhance tests/ui/login-ui.spec.ts`

## Code Generation Agent

### @codegen-agent

Generate services, factories, or types from OpenAPI specifications.

**Usage:**

- `/codegen-agent generate [service-name]` - Generate service, factory, and types
- `/codegen-agent types [service-name]` - Generate only types
- `/codegen-agent service [service-name]` - Generate only service
- `/codegen-agent factory [service-name]` - Generate only factory

**Examples:**

- `/codegen-agent generate pet`
- `/codegen-agent types pet`
- `/codegen-agent service pet`
- `/codegen-agent factory pet`

## How to Use

To use any of these agents, simply type the slash command followed by the appropriate arguments in your terminal when using the opencode tool.

For example:

```
/api-agent generate pet getPetById
```

This will invoke the API agent to generate test cases for the pet service's getPetById operation based on your project's structure and standards.
