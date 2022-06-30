const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../models/productsModel');
const mockAllProducts = require('../../../helpers/mockProducts');


describe('Services', () => {
  describe('Será validado se é possível listar os produtos', () => {
    before(async () => {
      sinon.stub(productsModel, 'getProducts').resolves(mockAllProducts)
    })

    after(async () => {
      productsModel.getProducts.restore()
    })

    it('Verifica se retorna um array', async () => {
      const response = await productsService.getProducts();
  
      expect(response).to.be.a('array');
    });

    it('Verifica se retorna todos os produtos', async () => {
      const response = await productsService.getProducts();
      expect(response[0]).to.have.property('id');
      expect(response[0]).to.have.property('name');
      expect(response).to.deep.equal(mockAllProducts);
    });
  });

  describe('Será validado que é possível listar um produto pelo seu ID', () => {
    const id = 3
    before(async () => {
      sinon.stub(productsModel, 'getProductsById').resolves(mockAllProducts.find(product => product.id === id))
    })

    after(async () => {
      productsModel.getProductsById.restore()
    })

    it('Verifica se retorna um objeto', async  () => {
      const response = await productsModel.getProductsById(id);
      expect(response).to.be.a('object');
    });

    it('Verifica se retorna o produto pelo seu ID', async  () => {
      const response = await productsModel.getProductsById(id);
      expect(response).to.have.property('id');
      expect(response).to.have.property('name');
      expect(response).to.deep.equal(mockAllProducts[id - 1]);
    });
  });

  describe('Será validado se é possível adicionar um novo produto', () => { 
    const product = {
      id: 4,
      name: "Teste"
    }

    before(async () => {
      sinon.stub(productsModel, 'addProducts').resolves(product)
    })

    after(async () => {
      productsModel.addProducts.restore()
    })

    it('Quando é inserido com sucesso', async  () => {
      const response = await productsModel.addProducts(product);
      expect(response).to.be.a('object');
    })

    it('Tal objeto possui o id do novo produto inserido', async  () => {
      const response = await productsModel.addProducts(product);
      expect(response).to.have.property('id');
      expect(response).to.have.property('name');
    })
  })
});