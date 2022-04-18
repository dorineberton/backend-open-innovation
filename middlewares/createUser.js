const knex = require('knex')
const service = require('feathers-knex')
let config = require('../knexfile.js')
let database = knex(config.development)
const bcrypt = require('bcrypt')

module.exports = (request, response, next) => {
        let data = request.body
        let firstname = data.firstname
        let lastname = data.lastname
        let email = data.email
        let saltRounds = 10
        let hash = bcrypt.hashSync(data.password, saltRounds)
        //use feathers-knex
        let userService = service({Model: database, name: 'user'})
        let insertUser = async () => {
            await userService.create({firstname: firstname, lastname: lastname, email: email, password: hash, has_access: 1})
        }
        try{
            insertUser()
            response.send({message: 'enregistrement ok'})
        } 
        catch {
          response.send({message: 'erreur enregistrement'})
        }
        next()
      }
