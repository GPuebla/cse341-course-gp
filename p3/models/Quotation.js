const mongoose = require('mongoose');

const QUOTATION_STATUSES = ['draft', 'sent', 'accepted', 'rejected'];

const quotationSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    carrierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Carrier',
    },
    origin: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    cargoType: {
      type: String,
    },
    weight: {
      type: Number,
    },
    volume: {
      type: Number,
    },
    rate: {
      type: Number,
    },
    currency: {
      type: String,
    },
    status: {
      type: String,
      enum: QUOTATION_STATUSES,
      required: true,
      default: 'draft',
    },
    validUntil: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quotation', quotationSchema);
module.exports.QUOTATION_STATUSES = QUOTATION_STATUSES;
