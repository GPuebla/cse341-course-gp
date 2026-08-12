// Unit tests for the quotation GET endpoints. The Mongoose models are mocked
// so these never touch the real Atlas database, and ensureAuth is stubbed to
// simulate an already-authenticated session so the route logic itself is
// what gets exercised.
jest.mock('../middlewares/ensureAuth', () => (req, res, next) => next());
jest.mock('../models/Quotation', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));
jest.mock('../models/Customer', () => ({ findById: jest.fn() }));
jest.mock('../models/Carrier', () => ({ findById: jest.fn() }));

const express = require('express');
const request = require('supertest');
const Quotation = require('../models/Quotation');
const quotationRoutes = require('../routes/quotation.routes');
const errorHandler = require('../middlewares/errorHandler');

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/quotations', quotationRoutes);
  app.use(errorHandler);
  return app;
};

const app = buildApp();

const VALID_ID = '507f1f77bcf86cd799439041';
const CUSTOMER_ID = '507f1f77bcf86cd799439012';

// The controllers call Quotation.find().populate(...).populate(...) and await
// the result directly, so the mock needs to be a chainable thenable: populate()
// returns the same object, and awaiting it resolves to `result`.
const mockPopulatedQuery = (result) => {
  const query = {};
  query.populate = jest.fn(() => query);
  query.then = (resolve, reject) => Promise.resolve(result).then(resolve, reject);
  return query;
};

afterEach(() => jest.clearAllMocks());

describe('GET /quotations', () => {
  it('returns 200 and the expected array when the mocked model resolves data', async () => {
    const quotations = [{ _id: VALID_ID, origin: 'Puerto de Buenos Aires', destination: 'Rotterdam' }];
    Quotation.find.mockReturnValue(mockPopulatedQuery(quotations));

    const res = await request(app).get('/quotations');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(quotations);
  });

  it('returns an empty array (200) when there are no documents', async () => {
    Quotation.find.mockReturnValue(mockPopulatedQuery([]));

    const res = await request(app).get('/quotations');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe('GET /quotations/:quotationId', () => {
  it('returns 200 and the document when it exists', async () => {
    const quotation = { _id: VALID_ID, origin: 'Puerto de Buenos Aires', destination: 'Rotterdam' };
    Quotation.findById.mockReturnValue(mockPopulatedQuery(quotation));

    const res = await request(app).get(`/quotations/${VALID_ID}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(quotation);
  });

  it('returns 404 when the mocked model resolves null', async () => {
    Quotation.findById.mockReturnValue(mockPopulatedQuery(null));

    const res = await request(app).get(`/quotations/${VALID_ID}`);

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

describe('GET /quotations/customer/:customerId', () => {
  it('returns 200 and the quotations belonging to that customer', async () => {
    const quotations = [{ _id: VALID_ID, customerId: CUSTOMER_ID }];
    Quotation.find.mockReturnValue(mockPopulatedQuery(quotations));

    const res = await request(app).get(`/quotations/customer/${CUSTOMER_ID}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(quotations);
    expect(Quotation.find).toHaveBeenCalledWith({ customerId: CUSTOMER_ID });
  });
});
