const mongoose = require('mongoose');

const carrierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    scacCode: {
      type: String,
      trim: true,
      uppercase: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Carrier', carrierSchema);
