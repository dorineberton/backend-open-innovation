const express = require('express');
const router = express.Router();
const createUser = require('../middlewares/createUser')
const readUsers = require('../middlewares/readUsers')
const auth = require('../middlewares/authenticate')
// middleware that is specific to this router
/*router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});*/
// define the home page route
/*router.get('/', function(req, res) {
  res.status(200)
});*/
router.get('/', readUsers)

router.get('/:id', function(req, res) {
  const id = parseInt(req.params.id)
  // TODO
});
// router.use('/create', createUser)
router.use('/create', auth, createUser)
module.exports = router;