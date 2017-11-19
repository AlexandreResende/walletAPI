
const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/user.controllers');

router.post('/authentication', userControllers.authentication);

router.post('/users', userControllers.signup);

router.put('/users', userControllers.edituser);

module.exports = router;