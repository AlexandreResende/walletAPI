
const express = require('express');

const router = express.Router();

const {
  getwallets,
  addwallet,
  editwallet,
  deletewallet,
  getlimit,
  editlimit,
} = require('../controllers/wallet.controllers');

router.get('/:userid/wallet', getwallets);

router.post('/:userid/wallet', addwallet);

router.put('/:userid/:walletid', editwallet);

router.delete('/:userid/:walletid', deletewallet);

router.get('/:userid/:walletid/limit', getlimit);

router.put('/:userid/:walletid/limit', editlimit);

module.exports = router;
