const salesModel = require('../models/salesModel');

const itemsSoldValidations = (sale) => Promise.all(sale.map(({ productId, quantity }) => {
    if (!productId) {
      return { message: { message: '"productId" is required' },
        status: 400,
      };
    }
    if (quantity < 1) {
      return { message: { message: '"quantity" must be greater than or equal to 1' },
        status: 422,
      };
    }
    if (!quantity) {
      return { message: { message: '"quantity" is required' },
        status: 400,
      };
    }
    return false;
  }));

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
};