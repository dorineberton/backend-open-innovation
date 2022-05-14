var express = require('express');
var router = express.Router();
const knex = require('knex')
const service = require('feathers-knex')
const bcrypt = require('bcrypt')
let config = require('../knexfile.js')
let database = knex(config.development)
let jwt = require('jsonwebtoken')

router.post('/', async function (req, res, next) {
    const reqPath = req.originalUrl
    console.log('reqPath', reqPath)
    if (reqPath == '/login'){
      const email = req.body.email
      console.log('je suis dans login', email)
      //use feathers-knex
      let userService = service({Model: database, name: 'user'})
      let selectUser = await userService.find({ query: {email} })
      if(selectUser[0] === undefined || selectUser[0] === '') res.send({message: "erreur login ou mot de passe"})
      else {
        console.log('je suis dans else')
        let id_user = selectUser[0].id
        let password = selectUser[0].password
        bcrypt.compare(req.body.password, password, function(error, response) {
          if(response){
            console.log('response', response, 'id_user', id_user)
            let token = jwt.sign({id:id_user}, 'secret2')
            res.cookie("cookie", token, {maxAge: 10*60*1000})
            res.status(200).json({message: "connecté", user: selectUser[0], token: token})  
          } else {
            res.status(404).json({message: "erreur" + error})
          }
        });
      }
    } else {
      next()
    }
  })

  module.exports = router;