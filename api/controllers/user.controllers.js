
const Joi = require('joi');

const User = require('../models-persistence/user.model');

module.exports.signup = (req, res) => {
  const signupSchema = {
    name: Joi.string().required().min(1),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  };
  const signupValidation = Joi.validate(req.body, signupSchema);

  Promise
    .all([signupValidation])
    .then(() => {
      User.signupUser(req, res, req.body);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'An error occurred in the signup',
        error: err,
      });
    });
}

module.exports.authentication = (req, res) => {
  const authenticationSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  };

  Joi
    .validate(req.body, authenticationSchema)
    .then(() => {
      User.authentication(req, res, req.body);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'An error occurred in the authentication',
        error: err.details[0].message });
    });
}

module.exports.edituser = (req, res) => {
  const editUserSchema = {
    name: Joi.string().optional().min(1),
    email: Joi.string().email().optional(),
    password: Joi.string().optional()
  };

  Joi
    .validate(req.body, editUserSchema)
    .then(() => {
      User.editUser(req, res, req.body);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'An error occurred when editing the data of the user',
        error: err.details[0].message });
    });
}

module.exports.deleteuser = (req, res) => {
  User.deleteUser(req, res);
}
