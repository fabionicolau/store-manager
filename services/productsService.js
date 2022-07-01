const productsModel = require('../models/productsModel');

const productNotFound = 'Product not found';

const nameValidation = (name) => {
   if (!name) {
 return {
    message: { message: '"name" is required' },
    status: 400,
    }; 
  }
  if (name.length < 5) {
 return {
    message: { message: '"name" length must be at least 5 characters long' },
    status: 422,
    }; 
  }
  return false;
};

const getProducts = async () => {
  const products = await productsModel.getProducts();
  if (!products) {
 return {
    message: { message: productNotFound },
    status: 404,
  }; 
}
  return {
    message: products,
    status: 200,
  }; 
};

const getProductsByQuery = async (query) => {
  if (!query) {
    return getProducts();
  }
  
  const products = await productsModel.getProductsByQuery(query);
  if (products.length === 0) {
    return {
      message: { message: productNotFound },
      status: 404,
    };
  }

  return {
    message: products,
    status: 200,
  };
};

const getProductsById = async (id) => {
  const products = await productsModel.getProductsById(id);
   if (!products) {
 return {
    message: { message: productNotFound },
    status: 404,
  }; 
}
  return {
    message: products,
    status: 200,
  }; 
};

const addProducts = async (name) => {
  if (nameValidation(name)) {
    return nameValidation(name);
  }
  
  const products = await productsModel.addProducts(name);
  return {
    message: products,
    status: 201,
  };
};

const updateProducts = async (id, name) => {
  if (nameValidation(name)) {
    return nameValidation(name);
  }

  const findProductsById = await productsModel.getProductsById(id);
  if (!findProductsById) {
 return {
    message: { message: productNotFound },
    status: 404,
  }; 
}
    
  const products = await productsModel.updateProducts(id, name);
  return {
    message: products,
    status: 200,
  };
};

const deleteProducts = async (id) => {
  const findProductsById = await productsModel.getProductsById(id);
   if (!findProductsById) {
 return {
    message: { message: productNotFound },
    status: 404,
  }; 
}
  
  await productsModel.deleteProducts(id);
  
  return {
    message: '',
    status: 204,
  };
};

module.exports = {
  getProducts,
  getProductsById,
  addProducts,
  updateProducts,
  deleteProducts,
  getProductsByQuery,
};