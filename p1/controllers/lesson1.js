const sarah = (req, res) => {
  res.send('Sarah!');
};

const emily = (req, res) => {
  res.send('Emily!');
};

const hannah = (req, res) => {
  res.send('Hannah!');
};

module.exports = {
  sarah,
  emily,
  hannah
};