const knex = require('knex')
const service = require('feathers-knex')
let config = require('../knexfile.js')
let database = knex(config.development)
const bcrypt = require('bcrypt')

module.exports = async (request, response, next) => {
   
        //use feathers-knex
        let userService = service({Model: database, name: 'user'})
        let usersRetrieved = []
        let message = ''
        try{
          const users = await userService.find()
          if(users) response.send({users: users})
          else response.send({message: 'Aucun utilisateur enregistré'})
        } 
        catch {
          response.send({message: 'erreur d\'enregistrement'})
        }
        next()
      }
