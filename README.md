# Playwright TypeScript UI Tests

A UI test automation example using [Playwright Test](https://playwright.dev/)
and TypeScript, testing [saucedemo.com](https://www.saucedemo.com/) — a
public demo store built for test automation practice.

## Why this repo exists

This is a portfolio/demo project showing:

- Idiomatic Playwright Test usage in TypeScript (no wrapper frameworks)
- The Page Object Model pattern
- Cross-browser coverage (Chromium, Firefox, WebKit) plus a mobile emulation
  project, all configured declaratively in `playwright.config.ts`
- Sensible CI defaults: retries, tracing, screenshots/video only on failure
- A working GitHub Actions pipeline with an HTML report artifact

## Project structure

```
PlaywrightTsUiTests/
├── pages/
│   ├── LoginPage.ts        # Page object for the login page
│   └── InventoryPage.ts    # Page object for the product listing / cart
├── tests/
│   ├── login.spec.ts
│   └── cart.spec.ts
├── playwright.config.ts    # Browsers, reporters, tracing, base URL
├── tsconfig.json
├── package.json
└── .github/workflows/playwright.yml
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (this project is tested against Node 20)

## Setup

```bash
npm install
npm run install:browsers   # downloads Chromium, Firefox, WebKit
```

## Running the tests

```bash
npm test                   # headless, all configured projects
npm run test:headed        # watch the browser run
npm run test:ui            # Playwright's interactive UI mode
npm run test:debug         # step through with the Playwright inspector
npm run test:chromium      # just the chromium project
npm run report             # open the last HTML report
```

## What's configured

`playwright.config.ts` defines four projects that the full suite runs
against:

| Project | What it covers |
|---|---|
| `chromium` | Desktop Chrome |
| `firefox` | Desktop Firefox |
| `webkit` | Desktop Safari |
| `Mobile Chrome` | Pixel 7 emulation |

Each test file also runs independently across all four — no extra code
needed, Playwright Test handles the fan-out.

On CI, failed tests retry up to twice, and traces/videos are only kept for
failures to keep artifacts small.

## What's being tested

- **`login.spec.ts`** — standard login, locked-out user, empty-field
  validation, and invalid-credential handling
- **`cart.spec.ts`** — adding one or more items to the cart and verifying
  the cart badge count, plus verifying the "price low to high" sort actually
  sorts

## CI/CD

`.github/workflows/playwright.yml` runs on every push/PR to `main`:

1. Installs Node dependencies (`npm ci`)
2. Installs Playwright's browsers with OS dependencies
3. Runs the full suite across all four projects
4. Uploads the HTML report as a build artifact, even on failure

## Possible extensions

- Add visual regression tests using Playwright's built-in screenshot comparison
- Add API-level setup (e.g. seeding test data via `request` fixture) instead of UI-driven login for faster, more isolated tests
- Add a GitHub Pages step to publish the HTML report automatically
- Parameterize the base URL via an environment variable to point at different environments (dev/staging/prod)
