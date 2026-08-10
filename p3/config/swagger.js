const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CargoQuote API',
    description: 'API for managing freight quotations, customers, carriers and ports - CSE 341',
  },
  host: process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:5000',
  schemes: process.env.RENDER_EXTERNAL_HOSTNAME ? ['https'] : ['http'],
  securityDefinitions: {
    sessionAuth: {
      type: 'apiKey',
      in: 'cookie',
      name: 'connect.sid',
      description:
        'Session cookie set after logging in via GET /auth/github. Log in through a browser first, then use Swagger UI in that SAME browser tab so the cookie is sent automatically with "Try it out".',
    },
  },
};

// Paths are resolved relative to THIS file's location (config/), not the CWD.
const outputFile = '../swagger.json';
const endpointsFiles = ['../routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
