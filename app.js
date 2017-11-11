
const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const helmet = require('helmet');

const userRouter = require('./api/routes/user.routes');
const walletRouter = require('./api/routes/wallet.routes');

const app = express();
const port = process.env.PORT || 3000;

app
  .use(helmet())
  .use(bodyParser.urlencoded({ extended: true}))
  .use(bodyParser.json())
  .use('/', userRouter)
  .use('/wallet', walletRouter)
  .listen(port, () => console.log(`Server running on port ${port}`));
