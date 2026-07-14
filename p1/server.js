const express = require('express');
const swaggerUi = require('swagger-ui-express');

const mongodb = require('./data/db.js');
const app = express();
// Render sits behind a proxy that terminates HTTPS and forwards to us over HTTP;
// without this, req.protocol always reports "http" and Swagger UI would send
// "Try it out" requests over http from an https page, which browsers block.
app.set('trust proxy', 1);
app.use(express.json());
const routes = require('./routes/index');

try {
  // swagger.json is generated locally (npm run swagger), so its host/schemes
  // reflect whatever machine generated it (usually localhost). Rebuild those
  // two fields from the incoming request instead of trusting the file, so
  // Swagger UI always points at the environment it's actually being served from.
  const swaggerDocument = require('./swagger.json');
  const getSwaggerDocument = (req) => ({
    ...swaggerDocument,
    host: req.get('host'),
    schemes: [req.protocol],
  });
  // swaggerUi.setup() normally takes a fixed document; wrapping it in a
  // per-request handler lets us pass the request-specific document above.
  app.use('/api-docs', swaggerUi.serve, (req, res, next) =>
    swaggerUi.setup(getSwaggerDocument(req))(req, res, next)
  );
  app.get('/swagger.json', (req, res) => res.json(getSwaggerDocument(req)));
} catch (err) {
  console.log('swagger.json not found, run "npm run swagger" to generate it. /api-docs will not be available.');
}

app.use('/', routes);

const PORT = process.env.PORT || 5000;


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Database is listening and server is running on port ${PORT}`);
    });
  }
});