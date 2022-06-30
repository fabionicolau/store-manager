const salesModel = require('../models/salesModel');

const getSales = async () => {
  const sales = await salesModel.getSales();
  if (sales.length === 0) {
    return {
      message: { message: 'Sale not found' },
      status: 404,
    };
  }
  return {
    message: sales,
    status: 200,
  };
};

const getSalesById = async (id) => {
  const sales = await salesModel.getSalesById(id);
  if (sales.length === 0) {
    return {
      message: { message: 'Sale not found' },
      status: 404,
    };
  }
  return {
    message: sales,
    status: 200,
  };
};

module.exports = {
  getSales,
  getSalesById,
};