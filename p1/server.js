const express = require('express');

const mongodb = require('./data/db.js');
const app = express();
const routes = require('./routes/index');


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