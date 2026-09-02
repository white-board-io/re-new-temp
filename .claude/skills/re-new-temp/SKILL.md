```markdown
# re-new-temp Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill documents the development patterns and conventions found in the `re-new-temp` repository, a TypeScript project with no detected framework. It covers file naming, import/export styles, commit conventions, and testing patterns to help contributors maintain consistency and quality.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `userProfile.ts`, `dataFetcher.test.ts`

### Import Style
- Use **absolute imports** (no relative paths).
  - Example:
    ```typescript
    import { fetchData } from 'services/dataFetcher';
    ```

### Export Style
- Use **named exports** (avoid default exports).
  - Example:
    ```typescript
    // In userProfile.ts
    export function getUserProfile(id: string) { ... }
    ```

    ```typescript
    // In another file
    import { getUserProfile } from 'userProfile';
    ```

### Commit Messages
- Follow **Conventional Commits** with the prefix `feat`.
- Average commit message length: ~60 characters.
  - Example:
    ```
    feat: add user authentication middleware
    ```

## Workflows

_No explicit workflows detected in the repository._

## Testing Patterns

- **Test files** use the pattern: `*.test.*`
  - Example: `userProfile.test.ts`
- **Testing framework**: Not detected (review project for specifics).
- **Test structure**: Place test files alongside or near the code they test.

  ```typescript
  // userProfile.test.ts
  import { getUserProfile } from 'userProfile';

  test('returns correct user profile', () => {
    // test implementation
  });
  ```

## Commands
| Command | Purpose |
|---------|---------|
| /test   | Run all test files matching `*.test.*` |
| /commit | Create a conventional commit with `feat` prefix |
```