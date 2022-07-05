const salesServices = require('../services/salesService');

const status500Message = 'Internal Server Error';

const addSales = async (req, res) => {
  try {
    const { body } = req;
    const sales = await salesServices.addSales(body);

    res.status(sales.status).json(sales.message);
  } catch (error) {
    res.status(500).json({ message: status500Message });
  }
};

const updateSales = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const sales = await salesServices.updateSales(id, body);

    res.status(sales.status).json(sales.message);
  } catch (error) {
    res.status(500).json({ message: status500Message });
  }
};

const getSales = async (_req, res) => {
  try {
    const sales = await salesServices.getSales();

    res.status(sales.status).json(sales.message);
  } catch (error) {
    res.status(500).json({ message: status500Message });
  }
};

const getSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await salesServices.getSalesById(id);

    res.status(sales.status).json(sales.message);
  } catch (error) {
    res.status(500).json({ message: status500Message });
  }
};

const deleteSales = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await salesServices.deleteSales(id);

    res.status(sales.status).json(sales.message);
  } catch (error) {
    res.status(500).json({ message: status500Message });
  }
};

module.exports = {
  getSales,
  getSalesById,
  addSales,
  deleteSales,
  updateSales,
};