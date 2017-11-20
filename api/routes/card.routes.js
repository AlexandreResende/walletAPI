
const express = require('express');

const router = express.Router();

const cardController = require('../controllers/card.controllers');

router.post('/:userid/:walletid/cards', cardController.addcard);

router.put('/:userid/:walletid/:cardid', cardController.editcard);

router.delete('/:userid/:walletid/:cardid', cardController.deletecard);

module.exports = router;