const productsModel = require('../models/productsModel');

const getProducts = async () => {
  const products = await productsModel.getProducts();
  if (!products) return [];
  return products;
};

const getProductsById = async (id) => {
  const products = await productsModel.getProductsById(id);
  if (!products) return [];
  return products;
};

const addProducts = async (name) => {
  if (!name) {
 return {
    message: { message: '"name" is required' },
    status: 400,
  }; 
}
  if (name.length < 5) {
 return {
    message: { message: '"name" length must be at least 5 characters long' },
    status: 422,
  }; 
}
    
  const products = await productsModel.addProducts(name);
  return {
    message: products,
    status: 201,
  };
};

module.exports = {
  getProducts,
  getProductsById,
  addProducts,
};