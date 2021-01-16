const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Add you mongoDB url in a '.env' file in the root of the application
// e.g. MONGO_URL=dummy_url
require('dotenv').config();
const mongoUrl = process.env.MONGO_URL;

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
