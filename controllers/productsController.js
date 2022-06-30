const productsService = require('../services/productsService');

const status500Message = 'Internal Server Error';

const getProducts = async (_req, res) => {
  try {
    const products = await productsService.getProducts();
  
    res.status(products.status).json(products.message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: status500Message });
  }
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await productsService.getProductsById(id);

    res.status(products.status).json(products.message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: status500Message });
  }
};

const addProducts = async (req, res) => {
  try {
    const { name } = req.body;
    const products = await productsService.addProducts(name);

    res.status(products.status).json(products.message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: status500Message });
  }
};

const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const products = await productsService.updateProducts(id, name);

    res.status(products.status).json(products.message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: status500Message });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    
    const products = await productsService.deleteProducts(id);
    res.status(products.status).json(products.message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: status500Message });
  }
};

module.exports = {
  getProducts,
  getProductsById,
  addProducts,
  updateProducts,
  deleteProducts,
};