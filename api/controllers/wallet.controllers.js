
const walletModel = require('../models-persistence/wallet.model');

module.exports.getwallets = (req, res) => {
  walletModel().getwallets(req, res);
};

module.exports.addwallet = (req, res) => {
  walletModel().addwallet(req, res, req.body);
};

module.exports.editwallet = (req, res) => {
  walletModel().editwallet(req, res, req.body);
};

module.exports.deletewallet = (req, res) => {
  walletModel().deletewallet(req, res);
};

module.exports.getlimit = (req, res) => {
  walletModel().getlimit(req, res);
};

module.exports.editlimit = (req, res) => {
  walletModel().editlimit(req, res, req.body);
};
