# Playwright Typescript Sauce Demo E2E framework

This project is a comprehensive end-to-end test framework for the Sauce Demo website (https://www.saucedemo.com/v1/), built using TypeScript and Playwright with the Page Object Model design pattern.

## Features

- End-to-end testing of the complete checkout process
- Secure credential management with encryption
- Page Object Model design pattern for maintainable tests
- Parallel test execution across multiple browsers
- Comprehensive test reporting
- ESLint integration for code quality
- GitHub Actions workflow for CI/CD

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd playwright-ts-sauce
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

4. Set up encrypted credentials:

```bash
npm run setup-credentials
```

## Running Tests

To run all tests:

```bash
npm test
```

To run tests in a specific browser:

```bash
npm run test:chrome   # Chrome only
npm run test:firefox  # Firefox only
npm run test:safari   # Safari only
```

To run tests in headed mode (with browser UI):

```bash
npm run test:headed
```

To run tests in debug mode:

```bash
npm run test:debug
```

## Test Reports

HTML test reports are generated after each test run. To view the report:

```bash
npm run report
```

## Linting

To run ESLint:

```bash
npm run lint
```

To fix ESLint issues automatically:

```bash
npm run lint:fix
```

## Credential Management

This framework uses encryption to securely store and manage test credentials. The credentials are encrypted using AES encryption and stored in the config.json file.

To set up credentials:

```bash
npm run setup-credentials
```

For production use, set the `SALT` environment variable to a secure value. Default SALT value is set to '2025March' in the file `utils/encrypt_credential.ts`

## CI/CD Pipeline

The project includes a GitHub Actions workflow that:

1. Runs the test suite on push or pull request to the main branch
2. Generates and uploads test reports as artifacts
3. Runs ESLint to enforce code quality standards

To use the workflow, add the `SALT` secret to your GitHub repository.
