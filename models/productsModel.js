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

const addProducts = async (name) => {
  const [products] = await connection
    .execute('INSERT INTO StoreManager.products(name) VALUES (?)', [name]);
  return {
    id: products.insertId,
    name,
  };
};

module.exports = {
  getProducts,
  getProductsById,
  addProducts,
};