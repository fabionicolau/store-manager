const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../helpers/connection');
const productsModel = require('../../../models/productsModel');
const mockAllProducts = require('../../../helpers/mockProducts');


describe('Model',  () => {
  describe('Será validado se é possível listar os produtos', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([mockAllProducts])
    })
    after(async () => {
      connection.execute.restore()
    })

    it('Verifica se retorna um array', async  () => {
      const response = await productsModel.getProducts();
      expect(response).to.be.an('array').with.length(3);
    });
    
    it('Verifica se retorna a lista de produtos', async  () => {
      const response = await productsModel.getProducts();
      expect(response[0]).to.have.property('id');
      expect(response[0]).to.have.property('name');
      expect(response).to.deep.equal(mockAllProducts);
    });
  });

  describe('Será validado se é possível buscar um produto pela query', () => {
    const query = 'Martelo'
    const product = mockAllProducts.find(product => product.name.includes(query))
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[product]])
    })
    after(async () => {
      connection.execute.restore()
    })

    it('Verifica se retorna um array', async () => {
      const response = await productsModel.getProductsByQuery(query);
      expect(response).to.be.an('array').with.length(1);
    })

    it('Verifica se retorna o produto buscado', async () => {
      const response = await productsModel.getProductsByQuery(query);
      expect(response[0]).to.have.property('id');
      expect(response[0]).to.have.property('name');
      expect(response[0]).to.deep.equal(product);
    })
  })

  describe('Será validado se é possível listar um produto pelo seu ID', () => {  
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
    const product = "teste"

    before(async () => {
      sinon.stub(connection, 'execute').resolves([product])
    })

    after(async () => {
      connection.execute.restore()
    }
    )

    it('Quando é inserido com sucesso', async  () => {
      const response = await productsModel.addProducts(product);
      expect(response).to.be.a('object');
    }
    )

    it('Tal objeto possui o id do novo produto inserido', async  () => {
      const response = await productsModel.addProducts(product);
      expect(response).to.have.property('id');
      expect(response).to.have.property('name');
    })
  })

  describe('Será validado se é possível atualizar um produto', () => { 
    before(async () => {
      sinon.stub(connection, 'execute').resolves([{
        id: 1,
        name: 'teste'
      }])
    })

    after(async () => {
      connection.execute.restore()
    }
    )

    it('Quando é inserido com sucesso', async  () => {
      const response = await productsModel.addProducts(1, 'teste');
      expect(response).to.be.a('object');
    }
    )

    it('Tal objeto possui o id do novo produto inserido', async  () => {
      const response = await productsModel.addProducts(1, 'teste');
      expect(response).to.have.property('id');
      expect(response).to.have.property('name');
    })
  })
});
