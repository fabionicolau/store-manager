const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');
const mockAllProducts = require('../../../helpers/mockProducts');

describe('Controller', () => {
  describe('Ao chamar o controller getProducts', () => {
    describe('Quando retorna todos os produtos com sucesso', async () => {
      const response = {}
      const request = {}
    
      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'getProducts').resolves({
          status: 200,
          message: mockAllProducts
        });
      });
      
      after(async () => {
        productsService.getProducts.restore()
      })
    
      it('Verifica se retorna o código 200', async () => {
        await productsController.getProducts(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
    
      it('Verifica se retorna um array de produtos', async () => {
        await productsController.getProducts(request, response);
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      })
    })

    describe('Quando não retorna todos os produtos com sucesso', async () => {
      const response = {}
      const request = {}
    
      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsModel, 'getProducts').resolves(null)
      })
      
      after(async () => {
        productsModel.getProducts.restore()
      })
    
      it('Verifica se retorna o código 404', async () => {
        await productsController.getProducts(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true);
      })
    
      it('Verifica se retorna a mensagem de erro "Product not found"', async () => {
        await productsController.getProducts(request, response);
        expect(response.json.calledWith({ message: "Product not found" })).to.be.equal(true);
      })
    })
  })

  describe('Ao chamar o controller getProductsByQuery', () => {
    describe('Quando retorna o produto pesquisado com sucesso', async () => {
      const response = {}
      const request = {}
    
      before(async () => {
        request.query = 'Martelo'
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        const product = mockAllProducts.find(product => product.name.includes(request.query))
        sinon.stub(productsService, 'getProductsByQuery').resolves({
          status: 200,
          message: [product]})
      })
    
      after(async () => {
        productsService.getProductsByQuery.restore()
      })
  
      it('Verifica se retorna o código 200', async () => {
        await productsController.getProductsByQuery(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
  
      it('Verifica se retorna um array com o produto', async () => {
        await productsController.getProductsById(request, response);
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      })
    })
  }) 

  describe('Ao chamar o controller getProductsById', () => {
    describe('Quando retorna todos os produtos com sucesso', async () => {
      const response = {}
      const request = {}
  
      before(async () => {
        request.params = { id: 1 }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        const product = mockAllProducts.find(product => product.id === request.params.id)
        sinon.stub(productsService, 'getProductsById').resolves({
          status: 200,
          message: product
        })
      })
    
      after(async () => {
        productsService.getProductsById.restore()
      })
  
      it('Verifica se retorna o código 200', async () => {
        await productsController.getProductsById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
  
      it('Verifica se retorna um objeto com o produto', async () => {
        await productsController.getProductsById(request, response);
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      })
    })

    describe('Quando não retorna todos os produtos com sucesso', async () => {
      const response = {}
      const request = {}
  
      before(async () => {
        request.params = { id: 1 }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsModel, 'getProductsById').resolves(null)
      })
    
      after(async () => {
        productsModel.getProductsById.restore()
      })
  
      it('Verifica se retorna o código 404', async () => {
        await productsController.getProductsById(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true);
      })
  
      it('Verifica se retorna a mensagem de erro "Product not found"', async () => {
        await productsController.getProductsById(request, response);
        expect(response.json.calledWith({ message: "Product not found" })).to.be.equal(true);
      })
    })
  })

  describe('Ao chamar o controller addProducts', () => {
    describe('Quando adiciona todos os produtos com sucesso', async () => {
      const response = {}
      const request = {}
  
      before(async () => {
        request.body = {
          name: 'Teste',
        }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'addProducts').resolves({
            status: 201,
          message: { id: 4, name: request.body.name }
          })
      })
  
      after(async () => {
        productsService.addProducts.restore()
      })
  
      it('Verifica se retorna o código 201', async () => {
        await productsController.addProducts(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
      })
  
      it('Verifica se retorna um objeto com o produto', async () => {
        await productsController.addProducts(request, response);
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      })
    })
    describe('Quando não passa o nome com pelo menos 5 caracteres', async () => {
      const response = {}
      const request = {}
  
      before(async () => {
        request.body = { name: 'test' }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      })
 
      it('Verifica se retorna o código 422', async () => {
        await productsController.addProducts(request, response);
        expect(response.status.calledWith(422)).to.be.equal(true);
      })
  
      it('Verifica se retorna a mensagem de erro: "name length must be at least 5 characters long"', async () => {
        await productsController.addProducts(request, response);
        expect(response.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.equal(true);
      })
    })

    describe('Quando não passa nome nenhum', async () => {
      const response = {}
      const request = {}
  
      before(async () => {
        request.body = { name: '' }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      })
  
      it('Verifica se retorna o código 400', async () => {
        await productsController.addProducts(request, response);
        expect(response.status.calledWith(400)).to.be.equal(true);
      })
  
      it('Verifica se retorna a mensagem de erro: "name is required"', async () => {
        await productsController.addProducts(request, response);
        expect(response.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
      })
    })
  })  

  describe('Ao chamar o controller updateProducts', () => {
    describe('Quando adiciona todos os produtos com sucesso', async () => {
      const response = {}
      const request = {}
  
      before(async () => {
        request.params = 1
        request.body = { name: 'teste' }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'updateProducts').resolves({
            status: 201,
            message: { id: request.params, name: request.body.name }
          })
      })
  
      after(async () => {
        productsService.updateProducts.restore()
      })
  
      it('Verifica se retorna o código 201', async () => {
        await productsController.addProducts(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
      })
  
      it('Verifica se retorna um objeto com o produto', async () => {
        await productsController.addProducts(request, response);
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      })
    })

    describe('Quando não passa o nome com pelo menos 5 caracteres', async () => {
      const response = {}
      const request = {}
  
      beforeEach(async () => {
        request.params = 1
        request.body = { name: 'test' }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      })
 
      it('Verifica se retorna o código 422', async () => {
        await productsController.updateProducts(request, response);
        expect(response.status.calledWith(422)).to.be.equal(true);
      })
  
      it('Verifica se retorna a mensagem de erro: "name length must be at least 5 characters long"', async () => {
        await productsController.updateProducts(request, response);
        expect(response.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.equal(true);
      })
    })

    describe('Quando não passa nome nenhum', async () => {
      const response = {}
      const request = {}
  
      beforeEach(async () => {
        request.params = 1
        request.body = { name: '' }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      })
  
      it('Verifica se retorna o código 400', async () => {
        await productsController.updateProducts(request, response);
        expect(response.status.calledWith(400)).to.be.equal(true);
      })
  
      it('Verifica se retorna a mensagem de erro: "name is required"', async () => {
        await productsController.updateProducts(request, response);
        expect(response.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
      })
    })
  })  
})