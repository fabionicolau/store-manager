const connection = require('../helpers/connection');

const getProducts = async () => {
  const [products] = await connection
    .execute('SELECT * FROM StoreManager.products');
  return products;
};

const getProductsById = async (id) => {
  const [products] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return products[0];
};

module.exports = {
  getProducts,
  getProductsById,
};