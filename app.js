
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const userRouter = require('./api/routes/user.routes');
const cardRouter = require('./api/routes/card.routes');
const walletRouter = require('./api/routes/wallet.routes');

const app = express();
const port = process.env.PORT || 3000;

app
  .use(helmet())
  .use(bodyParser.urlencoded({ extended: true}))
  .use(bodyParser.json())
  .use(userRouter)
  .use(walletRouter)
  .use(cardRouter)
  .listen(port, () => console.log(`Server running on port ${port}`));
