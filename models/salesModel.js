const connection = require('../helpers/connection');

const getSales = async () => {
  const query = 'SELECT salesProducts.sale_id, sales.date, salesProducts.product_id, '
    + 'salesProducts.quantity FROM StoreManager.sales AS sales '
    + 'INNER JOIN StoreManager.sales_products AS salesProducts '
    + 'ON salesProducts.sale_id = sales.id '
    + 'ORDER BY salesProducts.sale_id ASC, salesProducts.product_id ASC;';
  const [products] = await connection
    .execute(query);
  
  return products.map((product) => ({
    saleId: product.sale_id,
    date: product.date,
    productId: product.product_id,
    quantity: product.quantity,
  }));
};

const getSalesById = async (id) => {
  const query = 'SELECT salesProducts.sale_id, sales.date, salesProducts.product_id, '
    + 'salesProducts.quantity FROM StoreManager.sales AS sales '
    + 'INNER JOIN StoreManager.sales_products AS salesProducts '
    + 'ON salesProducts.sale_id = sales.id '
    + 'WHERE sales.id = ? '
    + 'ORDER BY salesProducts.product_id ASC;';
  const [products] = await connection
    .execute(query, [id]);
  
  return products.map((product) => ({
    date: product.date,
    productId: product.product_id,
    quantity: product.quantity,
  }));
};
module.exports = {
  getSales,
  getSalesById,
};