const knex = require('knex')
const service = require('feathers-knex')
let config = require('../knexfile.js')
let database = knex(config.development)
const bcrypt = require('bcrypt')

module.exports = async (request, response, next) => {
            const userId = request.params.id
            //use feathers-knex
            let userService = service({Model: database, name: 'user'})
            let usersRetrieved = []
            let message = ''
            console.log('je suis dans readuser')
            try{
            const user = await userService.find({ query: {id: userId} })
            console.log('j ai recup user dans readuser', user)
            if(user) response.send({user: user})
            else response.send({message: 'Aucun utilisateur enregistrĂ©'})
            } 
            catch {
            response.send({message: 'erreur d\'enregistrement'})
            }
            next()
}
