const express = require('express');
const {getAccessToken} = require("./transactionFunctions");

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/users/:userId/transactions', async (req, res) => {
  const accessToken = await getAccessToken(req.query.clientId, req.query.clientSecret);
  res.send(`Access Token is ${accessToken}`);
});

module.exports = app;
