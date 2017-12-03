
const cardModel = require('../models-persistence/card.model');

module.exports.getcards = (req, res) => {
  cardModel().getcards(req, res);
};

module.exports.addcard = (req, res) => {
  cardModel().addcard(req, res, req.body);
};

module.exports.editcard = (req, res) => {
  cardModel().editcard(req, res, req.body);
};

module.exports.deletecard = (req, res) => {
  cardModel().deletecard(req, res);
};
