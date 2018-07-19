const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const wagner = require('wagner-core');
const path = require('path');


// MODELS
require('./models/models')(wagner);

const cliente = require('./router/cliente.router.js')(wagner);
const producto = require('./router/producto.router.js')(wagner);


let app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});


// ROUTERS

const uri = `/ventas/v1/`;

app.use(uri+'cliente', cliente);
app.use(uri+'producto', producto);

module.exports = app;