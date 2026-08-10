const mongoose = require('mongoose');
const Carrier = require('../models/Carrier');
const { AppError, catchAsync } = require('../utils/errors');

// GET /carriers
const getAllCarriers = catchAsync(async (req, res, next) => {
  const carriers = await Carrier.find();
  res.status(200).json(carriers);
});

// GET /carriers/:carrierId
const getCarrierById = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.carrierId)) {
    return next(new AppError('Invalid carrier id.', 400));
  }

  const carrier = await Carrier.findById(req.params.carrierId);

  if (!carrier) {
    return next(new AppError('Carrier not found.', 404));
  }

  res.status(200).json(carrier);
});

// POST /carriers
const createCarrier = catchAsync(async (req, res, next) => {
  const carrier = await Carrier.create(req.body);
  res.status(201).json(carrier);
});

// PUT /carriers/:carrierId
const updateCarrier = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.carrierId)) {
    return next(new AppError('Invalid carrier id.', 400));
  }

  const carrier = await Carrier.findByIdAndUpdate(req.params.carrierId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!carrier) {
    return next(new AppError('Carrier not found.', 404));
  }

  res.status(200).json(carrier);
});

// DELETE /carriers/:carrierId
const deleteCarrier = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.carrierId)) {
    return next(new AppError('Invalid carrier id.', 400));
  }

  const carrier = await Carrier.findByIdAndDelete(req.params.carrierId);

  if (!carrier) {
    return next(new AppError('Carrier not found.', 404));
  }

  res.status(200).json({ success: true, message: 'Carrier deleted.' });
});

module.exports = {
  getAllCarriers,
  getCarrierById,
  createCarrier,
  updateCarrier,
  deleteCarrier,
};
