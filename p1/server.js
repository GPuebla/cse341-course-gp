const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const mongodb = require('./data/db.js');
const app = express();
app.use(express.json());
const routes = require('./routes/index');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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