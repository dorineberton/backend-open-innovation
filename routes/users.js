const express = require('express');
const router = express.Router();
const createUser = require('../middlewares/createUser')
const readUsers = require('../middlewares/readUsers')
const readUser = require('../middlewares/readUser')
const updateUser = require('../middlewares/updateUser')
const deleteUser = require('../middlewares/deleteUser')
const auth = require('../middlewares/authenticate')
// middleware that is specific to this router
router.get('/', readUsers)

router.get('/:id', readUser);
router.post('/create', auth, createUser)
// router.use('/create', auth, createUser)

router.patch('/update/:id', auth, updateUser)

router.delete('/delete/:id', auth, deleteUser)
module.exports = router;