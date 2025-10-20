export const TestTags = {
  // Test Types
  SMOKE: '@smoke',
  INTEGRATION: '@integration',
  CONTRACT: '@contract',
  SYSTEM: '@system',
  NEGATIVE: '@negative',
  SECURITY: '@security',
  PERFORMANCE: '@performance',
  UI: '@ui',
  API: '@api',

  // Priority
  CRITICAL: '@critical',
  HIGH: '@high',
  MEDIUM: '@medium',
  LOW: '@low',

  // Features
  PET: '@pet',
  USER: '@user',
  STORE: '@store',
  AUTH: '@auth',

  // Status
  WIP: '@wip',
  FLAKY: '@flaky',
  KNOWN_ISSUE: '@known-issue'
};

// Usage in tests:
// test.describe(
//   'Pet API',
//   {
//     tag: [TestTags.SMOKE, TestTags.CRITICAL, TestTags.PET]
//   },
//   () => {
//     // tests
//   }
// );
