const knex = require('knex')
const service = require('feathers-knex')
let config = require('../knexfile.js')
let database = knex(config.development)
const bcrypt = require('bcrypt')

module.exports = async (request, response, next) => {
  console.log('requ id', request.params.id)
  let data = request.body
  console.log('data id', data.id)
  const userId = request.params.id
  //use feathers-knex
  let userService = service({Model: database, name: 'user'})
  let selectUser = await userService.find({ query: {id: userId} })
  const id_user = selectUser[0].id
  const email_user = selectUser[0].email
  console.log('user existe', id_user)
  if(id_user) {
    const firstname = data.firstname
    const lastname = data.lastname
    const email = data.email
    const hasAccess = data.has_access
    const role = data.role
    const saltRounds = 10
    const hash = bcrypt.hashSync(data.password, saltRounds)
    let user = {}
    user = {firstname: firstname, lastname: lastname, password: hash, email: email, has_access: hasAccess, role: role}
    try{
      const updateUser = await userService.update(id_user, user, { complete: false })
      response.send({message: 'modifications ok', user: updateUser})
    } 
    catch {
      response.send({message: 'erreur modifications'})
    }
    next()
  }
}
