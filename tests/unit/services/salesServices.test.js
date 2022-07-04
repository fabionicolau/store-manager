const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const mockAllSales = require('../../../helpers/mockAllSales');
const mockSalesById = require('../../../helpers/mockSalesById');

describe('Services', () => { 
  describe('Será validado se é possível listar todas as vendas', () => {
    before(async () => {
    sinon.stub(salesModel, 'getSales').resolves(mockAllSales);
  })
    after(async () => {
      salesModel.getSales.restore();
    })

    it('Verifica se retorna um array', async () => {
      const response = await salesService.getSales();
      expect(response.message).to.be.a('array').with.length(3);
    })

    it('Verifica se retorna a lista de vendas', async () => {
      const response = await salesService.getSales();
      expect(response.message[0]).to.have.property('saleId');
      expect(response.message[0]).to.have.property('date');
      expect(response.message[0]).to.have.property('productId');
      expect(response.message[0]).to.have.property('quantity');
      expect(response.message).to.deep.equal(mockAllSales);
    })
  })

  describe('Será validado se é possível buscar uma venda pelo seu ID', () => {
    before(async () => {
      sinon.stub(salesModel, 'getSalesById').resolves(mockSalesById);
    })
    after(async () => {
      salesModel.getSalesById.restore();
    })

    it('Verifica se retorna um array', async () => {
      const response = await salesService.getSalesById(3);
      expect(response.message).to.be.a('array').with.length(1);
    })

    it('Verifica se retorna a venda buscada', async () => {
      const response = await salesService.getSalesById(3);
      expect(response.message[0]).to.not.have.property('saleId');
      expect(response.message[0]).to.have.property('date');
      expect(response.message[0]).to.have.property('productId');
      expect(response.message[0]).to.have.property('quantity');
    })
  })
})