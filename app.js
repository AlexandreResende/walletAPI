
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const userRouter = require('./api/routes/user.routes');

const app = express();
const port = process.env.PORT || 3000;

app
  .use(helmet())
  .use(bodyParser.urlencoded({ extended: true}))
  .use(bodyParser.json())
  .use('/', userRouter)
  .listen(port, () => console.log(`Server running on port ${port}`));
