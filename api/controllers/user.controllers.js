
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
        error: 'An error occurred with signup controller in user',
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
    .catch(() => {
      res.status(500).send({
        error: 'An error occurred with authentication controller in user',
      });
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
    .catch(() => {
      res.status(500).send({
        error: 'An error occurred with edituser controller in user',
      });
    });
}

module.exports.deleteuser = (req, res) => {
  User.deleteUser(req, res);
}
