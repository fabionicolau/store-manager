const connection = require('../helpers/connection');

const productsExistsValidation = async (sales) => {
  const products = Promise.all(sales.map(async ({ productId }) => {
    const [product] = await connection
      .execute('SELECT * FROM products WHERE id = ?', [productId]);
    return product;
  }));
  const productNotFound = await (await products).some((product) => product.length === 0);
  return productNotFound;
};

const salesExistsValidation = async (id) => {
  const [sales] = await connection.execute('SELECT * FROM sales WHERE id = ?', [id]);
  return sales.length === 0;
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

const updateSales = async (id, sales) => {
  await Promise.all(sales.map(async ({ productId, quantity }) => {
    const updateQuery = 'UPDATE StoreManager.sales_products SET quantity = ?' 
    + ' WHERE sale_id = ? AND product_id = ?';
    await connection.execute(updateQuery, [quantity, id, productId]);
  }));

  return {
    saleId: id, 
    itemsUpdated: sales,
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

const deleteSales = async (id) => {
  await connection
    .execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
  await connection
    .execute('DELETE FROM StoreManager.sales_products WHERE sale_id = ?', [id]);
};

module.exports = {
  getSales,
  getSalesById,
  addSales,
  productsExistsValidation,
  salesExistsValidation,
  deleteSales,
  updateSales,
};