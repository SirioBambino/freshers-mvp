# Testing Strategy

This document outlines the testing strategy for the [Cleaner Hire MVP](/README.md). 

## 1. Functional Testing

Functional testing is executed using Vitest as the test runner and React Testing Library for component-level assertions.

**Unit Testing**: Target pure functions, data transformations, and business rules. These tests are executed locally during development and automated within the [CI/CD pipeline](/docs/operations/ci-cd-pipeline.md). Unit tests must remain decoupled from external systems, such as databases or network services, to maintain execution speed.

**Integration Testing**: Verify the interaction between the user interface and state management logic. These tests ensure data flows correctly through the system and the UI responds accurately to state changes. Integration tests are executed locally to verify features before pushing to the remote repository and are enforced during the [CI/CD pipeline](/docs/operations/ci-cd-pipeline.md).

## 2. Non-Functional Testing

Non-functional audits are automated during the staging phase of the [CI/CD Pipeline](/docs/operations/ci-cd-pipeline.md) to ensure the PWA meets production performance and accessibility standards.

**PWA Compliance**: [Playwright](https://playwright.dev/) is an end-to-end testing tool that can ensure the application follows Progressive Web App standards. It will be used to confirms the presence of a valid web app manifest, service worker registration, and offline support.

**Performance and Accessibility**: [Lighthouse](https://developer.chrome.com/docs/lighthouse/) executes automated audits for performance and accessibility. All deployments must meet defined threshold scores to ensure high-quality user experiences across varying device capabilities.
