# walletAPI

## Wallet api for managing credit cards

## Technologies:
1. Node.js
2. Postgresql
3. Sequelize CLI - ORM
4. Heroku

**Endpoint:** 
Marshmello
  > `user`: <br />
  >>`/users` <br />
  **Description: Sign up a user** <br />
  **Method: POST** <br />
  **Input Data:**

      {
        "name": "Alex Dimitri",
        "email": "alex_dimitri@ad.com",
        "password": "12345"
      }

  >>`/authentication` <br />
  **Description: Authenticate a user** <br />
  **Method: POST** <br />
  **Input Data:**

      {
        "email": "alex_dimitri@ad.com",
        "password": "12345"
      }

  >>`/users/:userId` <br />
  **Description: Update user info** <br />
  **Method: PUT** <br />
  **Input Data:**

      {
        "name": "Alex Celsius"
      }

  >>`/users/:userId` <br />
  **Description: Delete a user** <br />
  **Method: DELETE** <br />
  **Input Data: User to be deleted comes from req.params.userid**

  ---
  ---

  > `wallet`: <br />
  >>`/:userid/wallet` <br />
  **Description: Get alla the wallets of a specific user** <br />
  **Method: GET** <br />

  >>`/:userid/wallet` <br />
  **Description: Add a wallet to a specific user** <br />
  **Method: POST** <br />
  **Input Data:**

      {
        "name": "Dimitri wallet"
      }

  >>`/:userid/:walletid` <br />
  **Description: Edit a wallet from a user** <br />
  **Method: PUT** <br />
  **Input Data:**

      {
        "name": "Cassandra wallet"
      }
      
  >>`/:userid/:walletid` <br />
  **Description: Delete a wallet from a user** <br />
  **Method: DELETE** <br />
      
  >>`/:userid/:walletid/limit` <br />
  **Description: Get the limit of a wallet** <br />
  **Method: GET** <br />
      
  >>`/:userid/:walletid/limit` <br />
  **Description: Change the limit of a wallet** <br />
  **Method: PUT** <br />
  **Input Data:**

      {
        "limit": 3000
      }

  ---
  --- 

  > `card`: <br />
  >>`/:userid/:walletid/cards` <br />
  **Description: Get all the cards of a wallet** <br />
  **Method: GET** <br />

  >>`/:userid/:walletid/cards` <br />
  **Description: Add a card to a wallet** <br />
  **Method: POST** <br />
  **Input Data:**

      {
        "number": "1111111111111111",
        "ownername": "Dimitri Matri",
        "cvv": 123,
        "limit": 5000,
        "duedate": 5,
        "expirationdate": "02/2020"
      }

  >>`/:userid/:walletid/:cardid` <br />
  **Description: Edit the data from a card** <br />
  **Method: PUT** <br />
  **Input Data:**

      {
        "cvv": 345,
      }

  >>`/:userid/:walletid/:cardid` <br />
  **Description: Delete a card** <br />
  **Method: DELETE** <br />
