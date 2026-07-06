const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/welcome', (req, res) => {
  res.send('Welcome to our app!');
});

app.get('/goodbye', (req, res) => {
  res.send('Goodbye!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});