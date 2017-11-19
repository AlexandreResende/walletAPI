
const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/user.controllers');

router.post('/authentication', userControllers.authentication);

router.post('/users', userControllers.signup);

router.put('/users/:userid', userControllers.edituser);

router.delete('/users/:userid', userControllers.deleteuser);

module.exports = router;