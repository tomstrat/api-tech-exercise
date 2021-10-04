//Sudo code for tests. Written before coding began

//Test getAccessToken function
//Requires parameters clientId, clientSecret
//Returns access token
getAccessToken(clientId, clientSecret)
//Should return access token
getAccessToken()
//Should throw error lacking clientId and clientSecret
getAccessToken(wrongId, wrongSecret)
//Should throw error claiming incorrect credentials


//Test retrieveTransactions function
//Requires parameters userID, accessToken
//Returns array of transactions
retrieveTransactions(userID, accessToken)
//should return array of transactions
retrieveTransactions()
//should throw error lacking userId and accessToken
retrieveTransactions(wrongUserID, accessToken)
//should throw error claiming uknown userID


//test formatTransactions function
//Requires parameters transactions
//returns formatted array of transactions
formatTransactions(transactions)
//should return array of formatted transactions
formatTransactions()
//should throw error lacking transactions
formatTransactions(emptyTransactions)
//should return view for 0 transactions