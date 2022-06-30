const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../models/productsModel');
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
        sinon.stub(productsService, 'getProducts').resolves(mockAllProducts)
      })
      
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
        sinon.stub(productsService, 'getProducts').resolves(null)
      })
      
      after(async () => {
        productsService.getProducts.restore()
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

  describe('Ao chamar o controller getProductsById', () => {
    describe('Quando retorna todos os produtos com sucesso', async () => {
      const response = {}
      const request = {}
  
      before(async () => {
        request.params = { id: 1 }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'getProductsById').resolves(mockAllProducts.find(product => product.id === request.params.id))
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
        sinon.stub(productsService, 'getProductsById').resolves(null)
      })
    
      after(async () => {
        productsService.getProductsById.restore()
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
          id: 4,
          name: 'Teste',
        })
      })
  
      after(async () => {
        productsService.addProducts.restore()
      }
      )
  
      it('Verifica se retorna o código 201', async () => {
        await productsController.addProducts(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
      })
  
      it('Verifica se retorna um objeto com o produto', async () => {
        await productsController.addProducts(request, response);
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      })
    })
  })  
})