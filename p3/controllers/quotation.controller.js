const mongoose = require('mongoose');
const Quotation = require('../models/Quotation');
const Customer = require('../models/Customer');
const Carrier = require('../models/Carrier');
const { AppError, catchAsync } = require('../utils/errors');

const POPULATE_CUSTOMER = { path: 'customerId', select: 'name email company' };
const POPULATE_CARRIER = { path: 'carrierId', select: 'name scacCode' };

// Confirms customerId/carrierId point at documents that actually exist before writing.
const assertReferencesExist = async (customerId, carrierId, next) => {
  if (customerId) {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return next(new AppError('customerId does not match an existing customer.', 400));
    }
  }

  if (carrierId) {
    const carrier = await Carrier.findById(carrierId);
    if (!carrier) {
      return next(new AppError('carrierId does not match an existing carrier.', 400));
    }
  }

  return true;
};

// GET /quotations
const getAllQuotations = catchAsync(async (req, res, next) => {
  const quotations = await Quotation.find().populate(POPULATE_CUSTOMER).populate(POPULATE_CARRIER);
  res.status(200).json(quotations);
});

// GET /quotations/:quotationId
const getQuotationById = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.quotationId)) {
    return next(new AppError('Invalid quotation id.', 400));
  }

  const quotation = await Quotation.findById(req.params.quotationId)
    .populate(POPULATE_CUSTOMER)
    .populate(POPULATE_CARRIER);

  if (!quotation) {
    return next(new AppError('Quotation not found.', 404));
  }

  res.status(200).json(quotation);
});

// GET /quotations/customer/:customerId
const getQuotationsByCustomerId = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.customerId)) {
    return next(new AppError('Invalid customer id.', 400));
  }

  const quotations = await Quotation.find({ customerId: req.params.customerId })
    .populate(POPULATE_CUSTOMER)
    .populate(POPULATE_CARRIER);

  res.status(200).json(quotations);
});

// POST /quotations
const createQuotation = catchAsync(async (req, res, next) => {
  const ok = await assertReferencesExist(req.body.customerId, req.body.carrierId, next);
  if (ok !== true) return;

  const quotation = await Quotation.create(req.body);
  res.status(201).json(quotation);
});

// PUT /quotations/:quotationId
const updateQuotation = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.quotationId)) {
    return next(new AppError('Invalid quotation id.', 400));
  }

  const ok = await assertReferencesExist(req.body.customerId, req.body.carrierId, next);
  if (ok !== true) return;

  const quotation = await Quotation.findByIdAndUpdate(req.params.quotationId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!quotation) {
    return next(new AppError('Quotation not found.', 404));
  }

  res.status(200).json(quotation);
});

// PUT /quotations/:quotationId/status
const updateQuotationStatus = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.quotationId)) {
    return next(new AppError('Invalid quotation id.', 400));
  }

  const quotation = await Quotation.findByIdAndUpdate(
    req.params.quotationId,
    { status: req.body.status },
    { new: true, runValidators: true }
  );

  if (!quotation) {
    return next(new AppError('Quotation not found.', 404));
  }

  res.status(200).json(quotation);
});

// DELETE /quotations/:quotationId
const deleteQuotation = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.quotationId)) {
    return next(new AppError('Invalid quotation id.', 400));
  }

  const quotation = await Quotation.findByIdAndDelete(req.params.quotationId);

  if (!quotation) {
    return next(new AppError('Quotation not found.', 404));
  }

  res.status(200).json({ success: true, message: 'Quotation deleted.' });
});

module.exports = {
  getAllQuotations,
  getQuotationById,
  getQuotationsByCustomerId,
  createQuotation,
  updateQuotation,
  updateQuotationStatus,
  deleteQuotation,
};
