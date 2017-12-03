
const Joi = require('joi');

const cardModel = require('../models-persistence/card.model');

module.exports.getcards = (req, res) => {
  cardModel().getcards(req, res);
};

module.exports.addcard = (req, res) => {
  const cardSchema = {
    number: Joi.string().required().length(16),
    ownername: Joi.string().required(),
    cvv: Joi.string().required().length(3),
    limit: Joi.number().required(),
    duedate: Joi.number().required(),
    expirationdate: Joi.string().required()
  };

  const addCardValidation = Joi.validate(req.body, cardSchema);

  Promise
    .all([addCardValidation])
    .then((result) => {
      cardModel().addcard(req, res, req.body);
    })
    .catch((err) => {
      res.status(500).send({ error: err.details[0].message });
    });
};

module.exports.editcard = (req, res) => {
  const cardSchema = {
    number: Joi.string().optional().length(16),
    ownername: Joi.string().optional(),
    cvv: Joi.string().optional().length(3),
    limit: Joi.number().optional(),
    duedate: Joi.number().optional(),
    expirationdate: Joi.string().optional()
  };

  const editCardValidation = Joi.validate(req.body, cardSchema);

  Promise
    .all([editCardValidation])
    .then((result) => {
      cardModel().editcard(req, res, req.body);
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
};

module.exports.deletecard = (req, res) => {
  cardModel().deletecard(req, res);
};

module.exports.releasecredit = (req, res) => {
  cardModel().releasecredit(req, res);
};
