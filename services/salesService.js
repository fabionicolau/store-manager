const salesModel = require('../models/salesModel');
const itemsSoldValidations = require('../middlewares/itemsSoldValidation');
  
const addSales = async (sales) => {
  const itemsValidations = await (await itemsSoldValidations(sales)).find((item) => item.message);
  if (itemsValidations) {
    return itemsValidations;
  }

  const productNotFound = await salesModel.productsExistsValidation(sales);
  if (productNotFound) {
    return {
      message: { message: 'Product not found' },
      status: 404,
    };
  }
  
  const finalSale = await salesModel.addSales(sales);

  return {
    status: 201,
    message: finalSale,
  };
};

const updateSales = async (id, sales) => {
  const itemsValidations = await (await itemsSoldValidations(sales)).find((item) => item.message);
  if (itemsValidations) {
    return itemsValidations;
  }
  const productNotFound = await salesModel.productsExistsValidation(sales);
  if (productNotFound) {
    return { message: { message: 'Product not found' }, status: 404,
    };
  }
  const saleNotFound = await salesModel.salesExistsValidation(id);
  if (saleNotFound) {
    return { message: { message: 'Sale not found' }, status: 404 };
  }
  
  const updateSale = await salesModel.updateSales(id, sales);
  
  return {
    status: 200,
    message: updateSale,
  };
};

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

const deleteSales = async (id) => {
  const sales = await salesModel.getSalesById(id);
  if (sales.length === 0) {
    return {
      message: { message: 'Sale not found' },
      status: 404,
    };
  }

  await salesModel.deleteSales(id);
  return {
    message: '',
    status: 204,
  };
};

module.exports = {
  getSales,
  getSalesById,
  addSales,     
  itemsSoldValidations,
  deleteSales,
  updateSales,
};