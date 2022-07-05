const itemsSoldValidations = (sale) => Promise.all(sale.map(({ productId, quantity }) => {
    if (!productId) {
      return { message: { message: '"productId" is required' },
        status: 400,
      };
    }
    if (quantity < 1) {
      return { message: { message: '"quantity" must be greater than or equal to 1' },
        status: 422,
      };
    }
    if (!quantity) {
      return { message: { message: '"quantity" is required' },
        status: 400,
      };
    }
    return false;
}));

module.exports = itemsSoldValidations;