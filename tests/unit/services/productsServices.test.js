const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
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
  
      expect(response.message).to.be.a('array');
    });

    it('Verifica se retorna todos os produtos', async () => {
      const response = await productsService.getProducts();
      expect(response.message[0]).to.have.property('id');
      expect(response.message[0]).to.have.property('name');
      expect(response.message).to.deep.equal(mockAllProducts);
    });
  });

  describe('Será validado se é possível buscar um produto pela query', () => {
    const query = 'Martelo'
    const product = mockAllProducts.find(product => product.name.includes(query))
    afterEach(async () => {
      productsModel.getProductsByQuery.restore()
    })

    it('Verifica se retorna um array', async () => {
      sinon.stub(productsModel, 'getProductsByQuery').resolves([product])
      const response = await productsService.getProductsByQuery(query);
      
      expect(response.message).to.be.an('array').with.length(1);
    })

    it('Verifica se retorna o produto buscado', async () => {
      sinon.stub(productsModel, 'getProductsByQuery').resolves([product])
   
      const response = await productsService.getProductsByQuery(query);
      expect(response.message[0]).to.have.property('id');
      expect(response.message[0]).to.have.property('name');
      expect(response.message[0]).to.deep.equal(product);
    })

    it('verifica se ao não encontrar a query, retorna todos os produtos', async () => { 
      sinon.stub(productsModel, 'getProductsByQuery').resolves(mockAllProducts)
      const response = await productsService.getProductsByQuery('teste');
      expect(response.message).to.deep.equal(mockAllProducts);
    })
  })

  describe('Será validado que é possível listar um produto pelo seu ID', () => {
    const id = 3
    before(async () => {
      sinon.stub(productsModel, 'getProductsById').resolves(mockAllProducts.find(product => product.id === id))
    })

    after(async () => {
      productsModel.getProductsById.restore()
    })

    it('Verifica se retorna um objeto', async  () => {
      const response = await productsService.getProductsById(id);
      expect(response.message).to.be.a('object');
    });

    it('Verifica se retorna o produto pelo seu ID', async  () => {
      const response = await productsService.getProductsById(id);
      expect(response.message).to.have.property('id');
      expect(response.message).to.have.property('name');
      expect(response.message).to.deep.equal(mockAllProducts[id - 1]);
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
      const response = await productsService.addProducts(product);
      expect(response.message).to.be.a('object');
    })

    it('Tal objeto possui o id do novo produto inserido', async  () => {
      const response = await productsService.addProducts(product);
      expect(response.message).to.have.property('id');
      expect(response.message).to.have.property('name');
    })
  })

  describe('Será validado se é possível atualizar um produto', () => { 
    before(async () => {
      sinon.stub(productsModel, 'updateProducts').resolves({ id: 1, name: 'teste' })
    })

    after(async () => {
      productsModel.updateProducts.restore()
    })

    it('Quando é inserido com sucesso', async  () => {
      const response = await productsService.updateProducts(1, 'teste');
      expect(response.message).to.be.a('object');
    })

    it('Tal objeto possui o id do novo produto inserido', async  () => {
      const response = await productsService.updateProducts(1, 'teste');
      expect(response.message).to.have.property('id');
      expect(response.message).to.have.property('name');
    })
  })
});