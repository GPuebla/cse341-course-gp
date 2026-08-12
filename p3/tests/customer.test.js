// Unit tests for the customer GET endpoints. The Mongoose model is mocked so
// these never touch the real Atlas database, and ensureAuth is stubbed to
// simulate an already-authenticated session so the route logic itself is
// what gets exercised.
jest.mock('../middlewares/ensureAuth', () => (req, res, next) => next());
jest.mock('../models/Customer', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

const express = require('express');
const request = require('supertest');
const Customer = require('../models/Customer');
const customerRoutes = require('../routes/customer.routes');
const errorHandler = require('../middlewares/errorHandler');

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/customers', customerRoutes);
  app.use(errorHandler);
  return app;
};

const app = buildApp();

const VALID_ID = '507f1f77bcf86cd799439011';

afterEach(() => jest.clearAllMocks());

describe('GET /customers', () => {
  it('returns 200 and the expected array when the mocked model resolves data', async () => {
    const customers = [{ _id: VALID_ID, name: 'Ana Torres', email: 'ana.torres@example.com' }];
    Customer.find.mockResolvedValue(customers);

    const res = await request(app).get('/customers');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(customers);
  });

  it('returns an empty array (200) when there are no documents', async () => {
    Customer.find.mockResolvedValue([]);

    const res = await request(app).get('/customers');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe('GET /customers/:customerId', () => {
  it('returns 200 and the document when it exists', async () => {
    const customer = { _id: VALID_ID, name: 'Ana Torres', email: 'ana.torres@example.com' };
    Customer.findById.mockResolvedValue(customer);

    const res = await request(app).get(`/customers/${VALID_ID}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(customer);
  });

  it('returns 404 when the mocked model resolves null', async () => {
    Customer.findById.mockResolvedValue(null);

    const res = await request(app).get(`/customers/${VALID_ID}`);

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
