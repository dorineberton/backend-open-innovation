// const express = require('express')
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');

/* Database */
const knex = require('knex')
const config = require('./knexfile.js')
const database = knex(config.development)

const login = require('./routes/login')
const user = require('./routes/users')

const bodyParser=require('body-parser');

const cors = require("cors");

// Create an app that is a Feathers AND Express application
app = express(feathers());
app.configure(express.rest());

// gestion des cors
app.use(cors());
// add headers to authorize anybody access
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

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

// parse data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

/* Routes */

app.get('/', (req,res) => {
  res.send('ok')
})

app.use('/login', cors(corsOptionsDelegate), login);
app.use('/users', cors(corsOptionsDelegate), user);

/* Port */

var server = app.listen(process.env.PORT || 5000, () => {
	console.log('App listening at http://localhost:',  server.address().port);
})