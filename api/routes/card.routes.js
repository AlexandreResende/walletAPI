
const express = require('express');

const router = express.Router();

const cardController = require('../controllers/card.controllers');

router.get('/:userid/:walletid/cards', cardController.getcards);

router.post('/:userid/:walletid/cards', cardController.addcard);

router.put('/:userid/:walletid/:cardid', cardController.editcard);

router.delete('/:userid/:walletid/:cardid', cardController.deletecard);

router.put('/:userid/:walletid/:cardid/releasecredit', cardController.releasecredit);

module.exports = router;