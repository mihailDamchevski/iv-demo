# Playwright Todo Application – E2E Test Automation

This project provides end-to-end test automation for a Todo web application using **Playwright** with TypeScript.
It includes Page Object Model abstractions, data-driven tests, Dockerized execution, and a CI pipeline with **Allure report deployment to GitHub Pages**.

## Technology Stack

* Playwright (TypeScript)
* Node.js 20+
* Docker
* GitHub Actions
* Allure Reports
* GitHub Pages

## Project Structure

```
.
├── playwright/
│   ├── pages/
│   │   └── TodosPage.ts
│   ├── tests/
│   │   └── todos-tests.spec.ts
│   ├── test-data/
│   │   └── todo-test-data.ts
│   └── utils/
│       └── helpers.ts
├── allure-results/
├── allure-report/
├── .github/
│   └── workflows/
│       └── test.yml
├── Dockerfile
├── playwright.config.ts
├── package.json
└── README.md
```

## Test Coverage

### Core Functionality

* Add, edit, and delete todos
* Toggle todos between active and completed
* Clear completed todos
* Persist todos across page reloads
* Select all todos as completed

### Filters and Navigation

* Navigate to Active todos
* Navigate to Completed todos

### Edge and Negative Cases

* Prevent adding empty todos
* Trim leading/trailing spaces on todo input
* Handle malformed localStorage data without crashing

## Local Setup

### Prerequisites

* Node.js 20+
* npm
* Docker (optional, for containerized runs)

### Install Dependencies

```bash
npm ci
npx playwright install
```

## Running Tests Locally

```bash
npm test
```

Run with Playwright UI:

```bash
npx playwright test --ui
```

## Allure Reports (Local)

Generate the report:

```bash
npm run report:allure:generate
```

Open the report:

```bash
npm run report:allure:open
```

## Docker Execution

The project includes a Dockerfile that:

* Uses the official Playwright image
* Starts the application
* Waits for readiness
* Executes Playwright tests in headless mode

### Build Docker Image

```bash
docker build -t playwright-e2e .
```

### Run Tests in Container

```bash
docker run --rm playwright-e2e
```

## CI Pipeline (GitHub Actions)

The workflow (`.github/workflows/test.yml`) performs:

1. Install Node.js and dependencies
2. Install Playwright browsers
3. Start the Todo app
4. Wait for the app to be ready
5. Run Playwright tests (continues even if some tests fail)
6. Generate Allure report
7. Upload Allure report and other test artifacts
8. Deploy Allure report to GitHub Pages

Allure reports are deployed to the `gh-pages` branch, making them accessible online.

## Notes

* The tests use a **Page Object Model** (`TodosPage.ts`) for maintainability.
* Test data is separated (`todo-test-data.ts`) and includes default, random, and malformed todos.
* Docker ensures tests run in a consistent environment without local dependencies.
* GitHub Actions handles CI, artifact uploading, and report deployment automatically.
