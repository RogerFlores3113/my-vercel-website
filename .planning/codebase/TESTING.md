# Testing

## Test Framework
- Vitest 4.x, node environment, globals enabled (`vitest.config.ts`)
- No E2E test framework (Playwright/Cypress not present)
- No coverage threshold enforced

## Test Coverage
- Only 2 test files exist covering pure logic extraction
- Large untested surface: `PlatformerGame.tsx` (1200+ lines), `PandaWalker.tsx`, `GameLoader.tsx`, all static page content

## Test Patterns
- Tests do NOT mount React components — pure logic is extracted into standalone functions and tested directly (avoids JSDOM dependency)
- Both test files use `describe/it/expect` + `vi.fn()` spies with `beforeEach` reset
- Assertion patterns: `toHaveBeenCalledWith`, `toHaveBeenCalledOnce`, `not.toHaveBeenCalled`

## Test Files Found
- `app/page.test.ts` — covers home page logic
- `app/components/WelcomeSplash.test.ts` — covers WelcomeSplash component logic

## Gaps
- `PlatformerGame.tsx` (largest file) has zero test coverage
- `PandaWalker.tsx` untested
- `GameLoader.tsx` untested
- All static "boring site" pages untested
- No integration or E2E tests
- No coverage enforcement via thresholds
