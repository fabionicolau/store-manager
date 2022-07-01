const connection = require('../helpers/connection');

const produtsExistsValidation = async (sales) => {
  const products = Promise.all(sales.map(async ({ productId }) => {
    const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
    return product;
  }));
  const productNotFound = await (await products).some((product) => product.length === 0);
  return productNotFound;
};

const addSales = async (sales) => {
  const insertDateQuery = 'INSERT INTO StoreManager.sales (date) VALUES (CURRENT_TIMESTAMP())';
  const [{ insertId }] = await connection.execute(insertDateQuery);

  await Promise.all(sales.map(async ({ productId, quantity }) => {
    const insertSaleQuery = 'INSERT INTO StoreManager.sales_products '
      + '(sale_id, product_id, quantity) VALUES (?, ?, ?)';
    await connection.execute(insertSaleQuery, [insertId, productId, quantity]);
  }));
  
  return {
    id: insertId,
    itemsSold: sales,
  };
};

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
  addSales,
  produtsExistsValidation,
};