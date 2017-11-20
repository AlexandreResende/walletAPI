
const express = require('express');

const router = express.Router();

const walletController = require('../controllers/wallet.controllers');

router.get('/:userid/wallet', walletController.getwallets);

router.post('/:userid/wallet', walletController.addwallet);

router.put('/:userid/wallet/:walletid', walletController.editwallet);

router.delete('/:userid/wallet/:walletid', walletController.deletewallet);

router.get('/:userid/wallet/:walletid/limit', walletController.getlimit);

router.put('/:userid/wallet/:walletid/limit', walletController.editlimit);

module.exports = router;
