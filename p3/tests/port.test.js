// Unit tests for the port GET endpoints. The Mongoose model is mocked so
// these never touch the real Atlas database, and ensureAuth is stubbed to
// simulate an already-authenticated session so the route logic itself is
// what gets exercised.
jest.mock('../middlewares/ensureAuth', () => (req, res, next) => next());
jest.mock('../models/Port', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

const express = require('express');
const request = require('supertest');
const Port = require('../models/Port');
const portRoutes = require('../routes/port.routes');
const errorHandler = require('../middlewares/errorHandler');

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/ports', portRoutes);
  app.use(errorHandler);
  return app;
};

const app = buildApp();

const VALID_ID = '507f1f77bcf86cd799439031';

afterEach(() => jest.clearAllMocks());

describe('GET /ports', () => {
  it('returns 200 and the expected array when the mocked model resolves data', async () => {
    const ports = [{ _id: VALID_ID, name: 'Puerto de Buenos Aires', country: 'Argentina' }];
    Port.find.mockResolvedValue(ports);

    const res = await request(app).get('/ports');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(ports);
  });

  it('returns an empty array (200) when there are no documents', async () => {
    Port.find.mockResolvedValue([]);

    const res = await request(app).get('/ports');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe('GET /ports/:portId', () => {
  it('returns 200 and the document when it exists', async () => {
    const port = { _id: VALID_ID, name: 'Puerto de Buenos Aires', country: 'Argentina' };
    Port.findById.mockResolvedValue(port);

    const res = await request(app).get(`/ports/${VALID_ID}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(port);
  });

  it('returns 404 when the mocked model resolves null', async () => {
    Port.findById.mockResolvedValue(null);

    const res = await request(app).get(`/ports/${VALID_ID}`);

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
