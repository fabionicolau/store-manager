const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getProducts);
app.get('/products/search', productsController.getProductsByQuery);
app.get('/products/:id', productsController.getProductsById);
app.post('/products', productsController.addProducts);
app.put('/products/:id', productsController.updateProducts);
app.delete('/products/:id', productsController.deleteProducts);

app.get('/sales', salesController.getSales);
app.get('/sales/:id', salesController.getSalesById);
app.post('/sales', salesController.addSales);
app.put('/sales/:id', salesController.updateSales);
app.delete('/sales/:id', salesController.deleteSales);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;