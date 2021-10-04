const express = require('express');
const {getAccessToken, retrieveTransactions, formatTransactions} = require("./transactionFunctions");

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/users/:userId/transactions', async (req, res) => {
  const accessToken = await getAccessToken(req.query.clientId, req.query.clientSecret);
  const transactions = await retrieveTransactions(req.params.userId, accessToken);
  const formattedTransactions = formatTransactions(transactions);

  res.send(`<table>${formattedTransactions}</table>`);
});

module.exports = app;
