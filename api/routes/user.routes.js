
const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/user.controllers');

router.post('/authentication', userControllers.authentication);

router.post('/users', userControllers.signup);

router.put('/:id', userControllers.edituser);

module.exports = router;