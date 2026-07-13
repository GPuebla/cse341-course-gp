const express = require('express');
const swaggerUi = require('swagger-ui-express');

const mongodb = require('./data/db.js');
const app = express();
app.use(express.json());
const routes = require('./routes/index');

try {
  const swaggerDocument = require('./swagger.json');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get('/swagger.json', (req, res) => res.json(swaggerDocument));
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