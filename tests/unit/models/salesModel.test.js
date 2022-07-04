const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../helpers/connection');
const salesModel = require('../../../models/salesModel');
const mockAllSales = require('../../../helpers/mockAllSales');
const mockSalesById = require('../../../helpers/mockSalesById');

describe('Model', () => {
  describe('Será validado se é possível listar todas as vendas', async () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([mockAllSales]);
    })
    after(async () => { 
      connection.execute.restore();
    })

    it('Verifica se retorna um array', async () => {
      const response = await salesModel.getSales();
      expect(response).to.be.a('array').with.length(3);
    })

    it('Verifica se retorna a lista de vendas', async () => {
      const response = await salesModel.getSales();
      expect(response[0]).to.have.property('saleId');
      expect(response[0]).to.have.property('date');
      expect(response[0]).to.have.property('productId');
      expect(response[0]).to.have.property('quantity');
    })
  })

  describe('Será validado se é possível buscar uma venda pelo seu ID', async () => { 
    const id = 3
    before(async () => {
      sinon.stub(connection, 'execute').resolves([mockSalesById]);
    }, after(async () => {
      connection.execute.restore();
    }))

    it('Verifica se retorna um array', async () => {
      const response = await salesModel.getSalesById(id);
      expect(response).to.be.a('array').with.length(1);
    })

    it('Verifica se retorna a venda buscada', async () => {
      const response = await salesModel.getSalesById(id);
      expect(response[0]).to.not.have.property('saleId');
      expect(response[0]).to.have.property('date');
      expect(response[0]).to.have.property('productId');
      expect(response[0]).to.have.property('quantity');
    })
  })
})

