
const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 3000;

app
  .use(helmet())
  .use(bodyParser.urlencoded({ extended: true}))
  .use(bodyParser.json())
  .listen(port, () => console.log(`Server running on port ${port}`));
