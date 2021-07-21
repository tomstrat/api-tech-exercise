# Moneyhub API Team Technical Exercise

At Moneyhub, we make connections to banking providers to aggregate a user's account and transaction data.

For this task we ask you to write an API server that will connect with a simplified banking provider which has an endpoint to get an access token, and an end point to retrieve a user's transactions. The transactions returned are in the shape of an OpenBanking [transactions response](https://openbankinguk.github.io/read-write-api-site3/v3.1.7/resources-and-data-models/aisp/Transactions.html#uml-diagram)

Our implementation allows for pagination as specified in the specification. Where we differ is the actual URL to get the transactions.

We have begun the API server with a skeleton server and swagger document (that can be accessed from the running server on the `/doc` endpoint.)

## Banking Institution Server

The banking institution server we have written has two end points that you'll need to interact with, below is a description of both. The banking provider end points can be found on the prefixed URL of `https://obmockaspsp.moneyhub.co.uk/api`

### `POST /token`

This end point will be used to get an access token which must be used when retrieving the transactions.

The token end point will accept a request that follows an OAuth2/OpenID Connection client credentials grant. We have configured a client for you with the following details:

- `client_id`: `ba1bdcc0-60f5-4939-afc4-1b13a98dc490`
- `client_secret`: `6f1afff8-eb81-4945-8b91-a05e3d095ce3`

#### Example cURL

```bash
curl --request POST \
  --url 'http://obmockaspsp.dev.127.0.0.1.nip.io/api/token?=' \
  --header 'Authorization: Basic YmExYmRjYzAtNjBmNS00OTM5LWFmYzQtMWIxM2E5OGRjNDkwOjZmMWFmZmY4LWViODEtNDk0NS04YjkxLWEwNWUzZDA5NWNlMw==' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data scope=transactions \
  --data grant_type=client_credentials
```

### `GET /users/{userId}/transactions`

This end point will return the transactions from the bank. We accept any user ID for ease of use.

The end point will expect an access token that has been returned from the token end point, which will have a scope of `transactions`.

The transactions end point allows for pagination, information for which is found in the OpenBanking specification and can be followed using the `Links` property of the response object.

## API Server

This is what you will need to write code for. It'll need just one end point to be implemented, this end point is `GET /users/{userId}/transactions` where you will need to:

- get an access token from the bank
- retrieve the transactions from the bank
- format the transactions according to the schema laid out in the swagger documentation

We strongly recommend writing tests in whatever framework you're comfortable with.
