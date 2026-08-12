# Contributions

This is a team assignment completed solo, as documented in the project proposal.

## Week 6 — Gabriel Puebla (2026-08-12)

- **Unit test suite (`p3/tests/`)**: Added Jest + Supertest coverage for the GET endpoints of all four collections (Customers, Quotations, Carriers, Ports) — 17 tests total. Mongoose model calls are mocked with `jest.mock`, so the tests exercise route/controller logic without touching the live Atlas database, and the session-auth middleware is stubbed to simulate an authenticated request.
- **CRUD/validation/auth audit**: Reviewed the Carriers and Ports controllers and routes for full CRUD with proper error handling (400 on invalid id, 404 on missing document, 500 on server error), confirmed Joi validation is wired through the `validate` middleware on POST/PUT for all four collections, and confirmed `ensureAuth` still gates every route across all four collections. No gaps were found that required fixing outside of adding the test suite.
