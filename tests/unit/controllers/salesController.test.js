const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');
const mockAllSales = require('../../../helpers/mockAllSales');
const mockSalesById = require('../../../helpers/mockSalesById');

describe('Controller', () => {
  describe('Ao chamar o controller getSales', () => {
    describe('Quando retorna todos as vendas com sucesso', async () => {
      const response = {}
      const request = {}
    
      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'getSales').resolves({
          status: 200,
          message: mockAllSales
        });
      });
      
      after(async () => {
        salesService.getSales.restore()
      })
    
      it('Verifica se retorna o código 200', async () => {
        await salesController.getSales(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
    
      it('Verifica se retorna um array de vendas', async () => {
        await salesController.getSales(request, response);
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      })
    })

    describe('Quando não retorna todos as vendas com sucesso', async () => {
      const response = {}
      const request = {}
    
      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesModel, 'getSales').resolves([])
      })
      
      after(async () => {
        salesModel.getSales.restore()
      })
    
      it('Verifica se retorna o código 404', async () => {
        await salesController.getSales(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true);
      })
    
      it('Verifica se retorna a mensagem de erro "Sale not found"', async () => {
        await salesController.getSales(request, response);
        expect(response.json.calledWith({ message: "Sale not found" })).to.be.equal(true);
      })
    })

    describe('Ao chamar o controller getSalesById', () => {
      describe('Quando retorna uma venda com sucesso', async () => {
        const response = {}
        const request = {}
    
        before(async () => {
          request.params = { id: 1 };
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns();
          sinon.stub(salesService, 'getSalesById').resolves({
            status: 200,
            message: mockSalesById
          });
        });

        after(async () => {
          salesService.getSalesById.restore()
        })

        it('Verifica se retorna o código 200', async () => {
          await salesController.getSalesById(request, response);
          expect(response.status.calledWith(200)).to.be.equal(true);
        })

        it('Verifica se retorna um array de vendas', async () => {
          await salesController.getSalesById(request, response);
          expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
        })
      })
    })

    describe('Quando não retorna todos as vendas com sucesso', async () => {
      const response = {}
      const request = {}
  
      before(async () => {
        request.params = { id: 1 }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesModel, 'getSalesById').resolves([])
      })
    
      after(async () => {
        salesModel.getSalesById.restore()
      })
  
      it('Verifica se retorna o código 404', async () => {
        await salesController.getSalesById(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true);
      })
  
      it('Verifica se retorna a mensagem de erro "Sale not found"', async () => {
        await salesController.getSalesById(request, response);
        expect(response.json.calledWith({ message: "Sale not found" })).to.be.equal(true);
      })
    })
  })
})