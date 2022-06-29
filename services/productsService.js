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

module.exports = {
  getProducts,
  getProductsById,
};