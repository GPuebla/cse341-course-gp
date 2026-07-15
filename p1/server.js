const express = require('express');
const swaggerUi = require('swagger-ui-express');

const mongodb = require('./data/db.js');
const app = express();

app.set('trust proxy', 1);
app.use(express.json());
const routes = require('./routes/index');

try {
   // Load the Swagger file.
  const swaggerDocument = require('./swagger.json');

  // Update host and protocol for the current request.
  const getSwaggerDocument = (req) => ({
    ...swaggerDocument,
    host: req.get('host'),
    schemes: [req.protocol],
  });

  // Serve Swagger UI with the updated configuration.
  app.use('/api-docs', swaggerUi.serve, (req, res, next) =>
    swaggerUi.setup(getSwaggerDocument(req))(req, res, next)
  );

  // Return the updated Swagger JSON.
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