const express = require('express');
const swaggerUi = require('swagger-ui-express');

const mongodb = require('./data/db.js');
const app = express();
app.set('trust proxy', 1);
app.use(express.json());
const routes = require('./routes/index');

try {
  const swaggerDocument = require('./swagger.json');
  const getSwaggerDocument = (req) => ({
    ...swaggerDocument,
    host: req.get('host'),
    schemes: [req.protocol],
  });
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