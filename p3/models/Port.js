const mongoose = require('mongoose');

const portSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    unlocode: {
      type: String,
      trim: true,
      uppercase: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Port', portSchema);
