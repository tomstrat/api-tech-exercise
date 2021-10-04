const got = require("got");

module.exports = {
  async getAccessToken(clientId, clientSecret){
    //Create Auth for the request
    const bufferAuth = new Buffer(`${clientId}:${clientSecret}`).toString("base64");

    try{
      const response = await got.post("https://obmockaspsp.moneyhub.co.uk/api/token", {
        headers: {
          Authorization: `Basic ${bufferAuth}`,
        },
        form:{
          scope:"transactions", 
          grant_type:"client_credentials"
        }
      });
      const accessToken = JSON.parse(response.body).access_token;
      return accessToken;

    } catch(e){
      throw new Error("Incorrect Credentials");
    }
  },

  async retrieveTransactions(userId, accessToken){
    try{
      const response = await got(`https://obmockaspsp.moneyhub.co.uk/api/users/${userId}/transactions`, {
        headers:{
          Authorization: `Bearer ${accessToken}`
        },
        params:{
          scope: "transactions",
        }
      });
      return response.body;
    }catch(e){
      throw new Error("Incorrect UserId");
    }
  },

  formatTransactions(transactions){
    const parsedTransactions = JSON.parse(transactions);
    let formattedTransactions = {transactions: []};

    //Loop through and add transaction objects for formatting.
    parsedTransactions.Data.Transactions.forEach(transaction => {
      let transactionObject = {}
      transactionObject.id = transaction.TransactionId;
      transactionObject.accountId = transaction.AccountId;
      transactionObject.amount =  transaction.Amount.Amount;
      transactionObject.date = transaction.BookingDateTime;
      transactionObject.description = transaction.TransactionInformation;
      transactionObject.status = transaction.Status;
      formattedTransactions.transactions.push(transactionObject);
    });

    return formattedTransactions;
  }
}