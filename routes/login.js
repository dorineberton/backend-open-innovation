var express = require('express');
var router = express.Router();
const knex = require('knex')
const service = require('feathers-knex')
const bcrypt = require('bcrypt')
let config = require('../knexfile.js')
let database = knex(config.development)
let jwt = require('jsonwebtoken')


router.post('/', async function (req, res) {
    // console.log(req.body)
    const email = req.body.email
    //use feathers-knex
    console.log('email', email)
    let userService = service({Model: database, name: 'user'})
    let selectUser = await userService.find({ query: {email} })

    let id_user = selectUser[0].id
    let password = selectUser[0].password
    console.log('select', selectUser)
    console.log('pass',password, req.body.password)
    // let pswd = bcrypt.compare(password, req.body.password.toString())
    bcrypt.compare(req.body.password, password, function(error, response) {
      if(response){
        let token = jwt.sign({id:id_user}, 'secret2')
        res.cookie("cookie", token, {maxAge: 10*60*1000})
        res.status(200).json({message: "connecté", user: selectUser[0], token: token})  
      } else {
        res.status(404).json({message: "erreur"})
      }
  });
  })

  module.exports = router;