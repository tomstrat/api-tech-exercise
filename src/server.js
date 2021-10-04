const express = require('express');
const {getAccessToken} = require("./transactionFunctions");

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/users/:userId/transactions', (req, res) => {
  const accessToken = getAccessToken(req.query.clientId, req.query.clientSecret);
  res.send(accessToken);
});

module.exports = app;
