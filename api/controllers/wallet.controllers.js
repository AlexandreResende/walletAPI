
const Joi = require('joi');

const walletModel = require('../models-persistence/wallet.model');

module.exports.getwallets = (req, res) => {
  walletModel.getwallets(req, res);
};

module.exports.addwallet = (req, res) => {
  const walletSchema = {
    name: Joi.string().min(1).required(),
  }

  const walletValidation = Joi.validate(req.body, walletSchema);

  Promise
    .all([walletValidation])
    .then(() => {
      walletModel.addwallet(req, res, req.body);
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
      walletModel.editwallet(req, res, req.body);
    })
    .catch((err) => {
      res.status(500).send({ error: err.details[0].message });
    });
};

module.exports.deletewallet = (req, res) => {
  walletModel.deletewallet(req, res);
};

module.exports.getlimit = (req, res) => {
  walletModel.getlimit(req, res);
};

module.exports.editlimit = (req, res) => {
  const limitSchema = {
    limit: Joi.number().required()
  }

  const walletValidation = Joi.validate(req.body, limitSchema);

  Promise
    .all([walletValidation])
    .then(() => {
      walletModel.editlimit(req, res, req.body);
    })
    .catch((err) => {
      res.status(500).send({ error: err.details[0].message });
    });
};
