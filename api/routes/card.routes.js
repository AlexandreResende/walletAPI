
const express = require('express');

const router = express.Router();

const cardController = require('../controllers/card.controllers');

router.get('/', cardController.getcards);

router.post('/', cardController.addcard);

router.put('/:cardid', cardController.editcard);

router.delete('/:cardid', cardController.deletecard);

module.exports = router;