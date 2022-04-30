const knex = require('knex')
const service = require('feathers-knex')
let config = require('../knexfile.js')
let database = knex(config.development)

module.exports = async (request, response, next) => {
  console.log('requ id', request.params.id)
  const userId = request.params.id
  //use feathers-knex
  let userService = service({Model: database, name: 'user'})

    try{
      const deleteUser = await userService.remove(userId)
      if(deleteUser.id) response.send({message: 'suppression ok'})
    } 
    catch {
      response.send({message: 'erreur suppression'})
    }
    next()
  }
