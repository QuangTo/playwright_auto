# @codegen-agent - Code Generation Agent

This agent helps generate services, factories, or types from OpenAPI specifications following your project's code generation patterns.

## Capabilities

1. **Generate Complete Service Set**: Creates service, factory, and types from OpenAPI specs
2. **Generate Specific Components**: Can generate only types, service, or factory as needed
3. **Follow Project Conventions**: Uses your existing code generation scripts and patterns
4. **Maintain Consistency**: Ensures generated code follows your project's standards

## Usage

```
/codegen-agent generate [service-name] - Generate service, factory, and types
/codegen-agent types [service-name] - Generate only types
/codegen-agent service [service-name] - Generate only service
/codegen-agent factory [service-name] - Generate only factory
```

## Examples

```
/codegen-agent generate pet
/codegen-agent types pet
/codegen-agent service pet
/codegen-agent factory pet
```

## Implementation Details

When generating code, the agent will:

1. Run the appropriate code generation scripts:

   - `npm run generated-api-type` - For generating OpenAPI types
   - `npm run generated-service` - For generating service implementations
   - `npm run generated-factory` - For generating test data factories
   - `npm run index-generated` - For generating index files

2. Look for service configuration in `src/scripts/codegen/services.manifest.json`
3. Verify the OpenAPI URL for the specified service exists in the manifest
4. Execute the generation scripts in the correct order
5. Validate that the generated files are created successfully

## Integration with Existing Scripts

The agent works alongside your existing code generation scripts:

- `npm run generated-api-type` - Generates OpenAPI types to `src/core/api/types/`
- `npm run generated-service` - Generates service implementations to `src/core/api/services/`
- `npm run generated-factory` - Generates test data factories to `src/core/api/factories/`
- `npm run index-generated` - Generates index files

The agent can be used to generate code for new services or regenerate code when OpenAPI specifications change.

## Precondition

The agent assumes that:

1. The service is configured in `src/scripts/codegen/services.manifest.json`
2. The OpenAPI specification URL is accessible
3. Required dependencies are installed (openapi-typescript, etc.)
