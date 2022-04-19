const knex = require('knex')
const service = require('feathers-knex')
let config = require('../knexfile.js')
let database = knex(config.development)
const bcrypt = require('bcrypt')

module.exports = async (request, response, next) => {
        let data = request.body
        const firstname = data.firstname
        const lastname = data.lastname
        const email = data.email
        const saltRounds = 10
        const hash = bcrypt.hashSync(data.password, saltRounds)
        //use feathers-knex
        let userService = service({Model: database, name: 'user'})
        let selectUser = await userService.find({ query: {email} })
        let insertUser = async () => {
          await userService.create({firstname: firstname, lastname: lastname, email: email, password: hash, has_access: 1, role: 'user'})
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
