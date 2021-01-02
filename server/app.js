const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mongoUrl = require('./utils/keys');

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express();
const router = require('./router');
const port = 4200;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);
app.listen(port);
console.log(`App listening at http://localhost:${port}`);
