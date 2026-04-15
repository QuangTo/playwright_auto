# @self-healing-agent - Test Stabilization and Self-Healing Agent

This agent helps identify flaky tests, add self-healing capabilities, and improve test reliability through intelligent retry mechanisms and adaptive test strategies.

## Capabilities

1. **Identify Flaky Tests**: Analyzes test execution history to detect tests with inconsistent results
2. **Add Self-Healing Mechanisms**: Implements intelligent retry strategies and adaptive locators
3. **Improve Test Reliability**: Suggests and applies fixes for common flakiness causes
4. **Enhance Test Stability**: Adds wait strategies, element visibility checks, and recovery mechanisms
5. **Generate Self-Healing Code**: Creates code that automatically adapts to minor UI/API changes

## Usage

```
/self-healing-agent analyze [test-file-path-or-glob]
/self-healing-agent heal [test-file-path-or-glob]
/self-healing-agent enhance [test-file-path-or-glob]
```

## Examples

```
/self-healing-agent analyze tests/
/self-healing-agent heal tests/api/pet-api.spec.ts
/self-healing-agent enhance tests/ui/login-ui.spec.ts
```

## Implementation Details

When analyzing tests for flakiness, the agent will:

1. Review test execution history (if available) or analyze test patterns that commonly cause flakiness
2. Identify common flakiness indicators:
   - Hardcoded waits (page.waitForTimeout, sleep)
   - Missing or improper wait strategies
   - Brittle locators (overly specific XPath, index-based selectors)
   - Race conditions in test execution
   - Improper test isolation (shared state between tests)
   - External dependencies without proper mocking
   - Timing-dependent assertions
   - Missing cleanup leading to state pollution

When healing/enhancing tests, the agent will:

1. Replace hardcoded waits with intelligent waiting strategies:
   - `waitForSelector` with appropriate state (visible, attached, etc.)
   - `waitForResponse` for API calls
   - `waitForLoadState` for page transitions
   - Custom wait functions for specific conditions
2. Improve locator robustness:
   - Replace index-based selectors with attribute-based selectors
   - Add fallback locator strategies
   - Use role-based selectors when available
   - Implement relative locators
3. Add retry mechanisms for flaky operations:
   - Implement retry logic for API calls with exponential backoff
   - Add retry wrappers for UI interactions
   - Create custom retry helpers for common flaky scenarios
4. Enhance test isolation:
   - Ensure proper cleanup in afterEach/afterAll hooks
   - Suggest test data cleanup strategies
   - Recommend parallel-safe test practices
5. Add self-healing capabilities:
   - Implement locator healing strategies (try multiple selectors)
   - Add automatic recovery for common UI states (popovers, modals, etc.)
   - Create adaptive test data generation that handles constraints
   - Implement smart assertion strategies that tolerate minor variations
6. Improve error handling and reporting:
   - Add better error messages for flaky test diagnosis
   - Implement diagnostic information collection
   - Add test execution metadata for flakiness analysis

## Specific Self-Healing Strategies

### For API Tests:

1. **Retry with Exponential Backoff**:

   ```typescript
   async function apiCallWithRetry(fn: () => Promise<any>, maxRetries = 3): Promise<any> {
     for (let i = 0; i < maxRetries; i++) {
       try {
         return await fn();
       } catch (error) {
         if (i === maxRetries - 1) throw error;
         // Wait for 2^i * 100ms before retry
         await new Promise((resolve) => setTimeout(resolve, Math.pow(2, i) * 100));
       }
     }
   }
   ```

2. **Adaptive Response Handling**:
   - Handle varying response structures gracefully
   - Validate required fields while allowing optional ones
   - Use schema validation with flexible matching

### For UI Tests:

1. **Smart Locator Strategies**:

   ```typescript
   async function smartClick(page: Page, selectors: string[]): Promise<void> {
     for (const selector of selectors) {
       try {
         await page.waitForSelector(selector, { state: 'visible', timeout: 2000 });
         await page.click(selector);
         return;
       } catch (error) {
         // Try next selector
         if (selector === selectors[selectors.length - 1]) throw error;
       }
     }
   }
   ```

2. **Automatic State Recovery**:
   - Handle unexpected modals, popovers, or banners
   - Implement automatic login recovery
   - Add page refresh strategies for stuck states

### For Test Data:

1. **Constraint-Aware Data Generation**:
   - Generate data that respects API validation rules
   - Handle unique constraints automatically
   - Create related test data intelligently

## Integration with Existing Framework

The self-healing agent works with your existing test framework:

- Compatible with Playwright's built-in retry mechanism (`retries` in config)
- Enhances your custom fixtures in `src/core/ui/fixtures/` and `src/core/api/fixtures/`
- Works with your Page Object Model implementations
- Integrates with your factory-based test data generation
- Complements your existing test tags and parallel execution

## Implementation Approach

The agent can be implemented as:

1. **Analysis Mode**: Scans test files and reports potential flakiness issues with line numbers and suggested fixes
2. **Healing Mode**: Automatically applies fixes to test files (with backup)
3. **Enhancement Mode**: Adds self-healing capabilities without changing existing test logic significantly

When applied to your framework, the agent would:

1. Leverage your existing factory patterns for resilient test data
2. Enhance your Page Objects with self-healing locator methods
3. Improve your API service clients with retry mechanisms
4. Add intelligent wait strategies to your base page objects
5. Implement automatic recovery mechanisms in your test fixtures
