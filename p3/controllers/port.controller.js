const mongoose = require('mongoose');
const Port = require('../models/Port');
const { AppError, catchAsync } = require('../utils/errors');

// GET /ports
const getAllPorts = catchAsync(async (req, res, next) => {
  const ports = await Port.find();
  res.status(200).json(ports);
});

// GET /ports/:portId
const getPortById = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.portId)) {
    return next(new AppError('Invalid port id.', 400));
  }

  const port = await Port.findById(req.params.portId);

  if (!port) {
    return next(new AppError('Port not found.', 404));
  }

  res.status(200).json(port);
});

// POST /ports
const createPort = catchAsync(async (req, res, next) => {
  const port = await Port.create(req.body);
  res.status(201).json(port);
});

// PUT /ports/:portId
const updatePort = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.portId)) {
    return next(new AppError('Invalid port id.', 400));
  }

  const port = await Port.findByIdAndUpdate(req.params.portId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!port) {
    return next(new AppError('Port not found.', 404));
  }

  res.status(200).json(port);
});

// DELETE /ports/:portId
const deletePort = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.portId)) {
    return next(new AppError('Invalid port id.', 400));
  }

  const port = await Port.findByIdAndDelete(req.params.portId);

  if (!port) {
    return next(new AppError('Port not found.', 404));
  }

  res.status(200).json({ success: true, message: 'Port deleted.' });
});

module.exports = {
  getAllPorts,
  getPortById,
  createPort,
  updatePort,
  deletePort,
};
