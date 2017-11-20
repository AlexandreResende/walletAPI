
const express = require('express');

const router = express.Router();

const walletController = require('../controllers/wallet.controllers');

router.get('/:userid/wallet', walletController.getwallets);

router.post('/:userid/wallet', walletController.addwallet);

router.put('/:userid/:walletid', walletController.editwallet);

router.delete('/:userid/:walletid', walletController.deletewallet);

router.get('/:userid/:walletid/limit', walletController.getlimit);

router.put('/:userid/:walletid/limit', walletController.editlimit);

module.exports = router;
