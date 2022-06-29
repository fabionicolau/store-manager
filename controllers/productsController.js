const productsService = require('../services/productsService');

const getProducts = async (_req, res) => {
  try {
    const products = await productsService.getProducts();
    if (products.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await productsService.getProductsById(id);
     if (products.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getProducts,
  getProductsById,
};