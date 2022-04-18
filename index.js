// const express = require('express')
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');

/* Database */
const knex = require('knex')
const config = require('./knexfile.js')
const database = knex(config.development)

const login = require('./routes/login')
const user = require('./routes/users')
const cors = require("cors");
// Create an app that is a Feathers AND Express application
app = express(feathers());

// gestion des cors
app.use(cors());
// add headers to authorize anybody access
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
/*
var allowlist = ['http://localhost:8080', 'http://127.0.0.1:8080/']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
*/
// replace body-parser
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.get('/', (req,res) => {
    res.send("ok")
})

/* Routes */
app.use('/login', login);
app.use('/users', user);

/* Port */

var server = app.listen(process.env.PORT || 5000, () => {
	console.log("App listening at http://localhost:",  server.address().port);
})