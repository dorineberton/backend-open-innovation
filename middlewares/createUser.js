const knex = require('knex')
const service = require('feathers-knex')
let config = require('../knexfile.js')
let database = knex(config.development)
const bcrypt = require('bcrypt')

module.exports = async(request, response, next) => {
        let data = request.body
        console.log('data create', data)
        const email = data.email
        const userService = service({Model: database, name: 'user'})
        let user = await userService.find({
            query: {
                email: email
            }
           })
          console.log('user', user)
          if(user == '' || user == {} || user == [] || user == undefined) {
            const firstname = data.firstname
            const lastname = data.lastname

            const role = data.role
            const saltRounds = 10
            const hash = bcrypt.hashSync(data.password, saltRounds)
            //use feathers-knex
            const user2 = {firstname: firstname, lastname: lastname, email: email, password: hash, has_access: 1, role: role}
            const insertUser = async (user) => await userService.create(user2)

            try{
                insertUser()
                response.send({message: 'enregistrement ok'})
            } 
            catch {
              response.send({message: 'erreur enregistrement'})
            }
            next()
          } else {
            response.send({message: 'l\'utilisateur existe déjà'})
          }
}