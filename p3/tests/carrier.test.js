// Unit tests for the carrier GET endpoints. The Mongoose model is mocked so
// these never touch the real Atlas database, and ensureAuth is stubbed to
// simulate an already-authenticated session so the route logic itself is
// what gets exercised.
jest.mock('../middlewares/ensureAuth', () => (req, res, next) => next());
jest.mock('../models/Carrier', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

const express = require('express');
const request = require('supertest');
const Carrier = require('../models/Carrier');
const carrierRoutes = require('../routes/carrier.routes');
const errorHandler = require('../middlewares/errorHandler');

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/carriers', carrierRoutes);
  app.use(errorHandler);
  return app;
};

const app = buildApp();

const VALID_ID = '507f1f77bcf86cd799439021';

afterEach(() => jest.clearAllMocks());

describe('GET /carriers', () => {
  it('returns 200 and the expected array when the mocked model resolves data', async () => {
    const carriers = [{ _id: VALID_ID, name: 'Maersk', scacCode: 'MAEU' }];
    Carrier.find.mockResolvedValue(carriers);

    const res = await request(app).get('/carriers');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(carriers);
  });

  it('returns an empty array (200) when there are no documents', async () => {
    Carrier.find.mockResolvedValue([]);

    const res = await request(app).get('/carriers');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe('GET /carriers/:carrierId', () => {
  it('returns 200 and the document when it exists', async () => {
    const carrier = { _id: VALID_ID, name: 'Maersk', scacCode: 'MAEU' };
    Carrier.findById.mockResolvedValue(carrier);

    const res = await request(app).get(`/carriers/${VALID_ID}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(carrier);
  });

  it('returns 404 when the mocked model resolves null', async () => {
    Carrier.findById.mockResolvedValue(null);

    const res = await request(app).get(`/carriers/${VALID_ID}`);

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
