
const Joi = require('joi');

const Wallet = require('../models-persistence/wallet.model');

module.exports.getwallets = (req, res) => {
  Wallet.getwallets(req, res);
};

module.exports.addwallet = (req, res) => {
  const walletSchema = {
    name: Joi.string().min(1).required(),
  };

  const walletValidation = Joi.validate(req.body, walletSchema);

  Promise
    .all([walletValidation])
    .then(() => {
      Wallet.addwallet(req, res, req.body);
    })
    .catch((err) => {
      res.status(500).send({ error: err.details[0].message });
    });
};

module.exports.editwallet = (req, res) => {
  const walletSchema = {
    name: Joi.string().min(1).required(),
  }

  const walletValidation = Joi.validate(req.body, walletSchema);

  Promise
    .all([walletValidation])
    .then(() => {
      Wallet.editwallet(req, res, req.body);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err });
    });
};

module.exports.deletewallet = (req, res) => {
  Wallet.deletewallet(req, res);
};

module.exports.getlimit = (req, res) => {
  Wallet.getlimit(req, res);
};

module.exports.editlimit = (req, res) => {
  const limitSchema = {
    limit: Joi.number().required()
  }

  const walletValidation = Joi.validate(req.body, limitSchema);

  Promise
    .all([walletValidation])
    .then(() => {
      Wallet.editlimit(req, res, req.body);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err.details[0].message });
    });
};
