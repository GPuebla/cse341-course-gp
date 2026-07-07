const welcome = (req, res) => {
  res.send('welcome!');
};

const goodbye = (req, res) => {
  res.send('goodbye!');
};

const hello = (req, res) => {
  res.send('Hello');
};

module.exports = {
  welcome,
  goodbye,
  hello
};