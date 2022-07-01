const salesServices = require('../services/salesService');

const addSales = async (req, res) => {
  try {
    const { body } = req;
    const sales = await salesServices.addSales(body);

    res.status(sales.status).json(sales.message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await salesServices.getSales();

    res.status(sales.status).json(sales.message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await salesServices.getSalesById(id);

    res.status(sales.status).json(sales.message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteSales = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await salesServices.deleteSales(id);

    res.status(sales.status).json(sales.message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getSales,
  getSalesById,
  addSales,
  deleteSales,
};