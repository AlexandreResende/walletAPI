
const express = require('express');

const router = express.Router();

const walletController = require('../controllers/wallet.controllers');

router.get('/', walletController.getwallets);

router.post('/', walletController.addwallet);

router.put('/:id', walletController.editwallet);

router.delete('/:id', walletController.deletewallet);

module.exports = router;
