const knex = require('knex')
const service = require('feathers-knex')
const bcrypt = require('bcrypt')
let config = require('../knexfile.js')
let database = knex(config.development)
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const reqPath = req.originalUrl
    console.log('request path', req.originalUrl, req.url)
    const token = req.headers.authorization.split(' ')[1]; // si on envoie bearer en 1er
    const decodedToken = jwt.verify(token, 'secret2');
    console.log('decodedToken', decodedToken)
    const userId = decodedToken.userId;
    let userService = service({Model: database, name: 'user'})
    let selectUser = await userService.find({ query: {id: userId} })
    const id_user = selectUser[0].id
    const role_user = selectUser[0].role
    if(id_user){
      if (reqPath.startsWith('/users/create') || reqPath.startsWith('/users/delete') || reqPath.startsWith('/users/update')) {
        if(role === 'admin' && userId == id_user){
          console.log('je suis dans admin et ok')
            next()
            return
        } else {
          console.log('je suis dans admin mais role pas admin ou userid !== id')
          console.log('userId', userId, 'id', idUser)
          res.status(401).send({error: 'non autorisé'})
        }
      } else if (reqPath.startsWith('/users')) {
        console.log('je suis un user')
        console.log('role', role, userId, idUser)
        if(role !== undefined && userId == idUser) {
            console.log('je suis connecté')
            res.userId = userId
            next()
            return
        } else {
          console.log('je suis un user mais non connecté')
          console.log('userId', userId, 'id', idUser)
          res.status(401).send({error: 'non autorisé'})
        }
      } else {
        console.log('mauvaise route')
        res.status(401).send({error: 'non autorisé'})
      }
    }
  } catch {
    res.status(401).json({
      error: 'Erreur authentification'
    });
  }
};
