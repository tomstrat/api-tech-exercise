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
}