const mongoose = require('mongoose');
const Customer = require('../models/Customer');
const { AppError, catchAsync } = require('../utils/errors');

// GET /customers
const getAllCustomers = catchAsync(async (req, res, next) => {
  const customers = await Customer.find();
  res.status(200).json(customers);
});

// GET /customers/:customerId
const getCustomerById = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.customerId)) {
    return next(new AppError('Invalid customer id.', 400));
  }

  const customer = await Customer.findById(req.params.customerId);

  if (!customer) {
    return next(new AppError('Customer not found.', 404));
  }

  res.status(200).json(customer);
});

// POST /customers
const createCustomer = catchAsync(async (req, res, next) => {
  const customer = await Customer.create(req.body);
  res.status(201).json(customer);
});

// PUT /customers/:customerId
const updateCustomer = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.customerId)) {
    return next(new AppError('Invalid customer id.', 400));
  }

  const customer = await Customer.findByIdAndUpdate(req.params.customerId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!customer) {
    return next(new AppError('Customer not found.', 404));
  }

  res.status(200).json(customer);
});

// DELETE /customers/:customerId
const deleteCustomer = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.customerId)) {
    return next(new AppError('Invalid customer id.', 400));
  }

  const customer = await Customer.findByIdAndDelete(req.params.customerId);

  if (!customer) {
    return next(new AppError('Customer not found.', 404));
  }

  res.status(200).json({ success: true, message: 'Customer deleted.' });
});

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
