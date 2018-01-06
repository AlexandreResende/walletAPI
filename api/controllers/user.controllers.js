
const Joi = require('joi');

const userModel = require('../models-persistence/user.model');

module.exports.signup = (req, res) => {
  const signupSchema = {
    name: Joi.string().required().min(1),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  };

  Joi
    .validate(req.body, signupSchema)
    .then(() => {
      userModel.signupUser(req, res, req.body);
    })
    .catch((err) => {
      if ('details' in err) {
        res.status(500).send({ error: err.details[0].message });
      } else {
        res.status(500).send({ error: err });
      }
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
      userModel.authentication(req, res, req.body);
    })
    .catch((err) => {
      res.status(500).send({ error: err.details[0].message });
    });
  /*
  const authenticationValidation = Joi.validate(req.body, authenticationSchema);
  
  Promise
    .all([authenticationValidation])
    .then(() => {
      userModel.authentication(req, res, req.body);
    })
    .catch((err) => {
      res.status(500).send({ error: err.details[0].message });
    });
  */
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
      userModel.editUser(req, res, req.body);
    })
    .catch((err) => {
      res.status(500).send({ error: err.details[0].message });
    });
  /*
  const editUserValidation = Joi.validate(req.body, editUserSchema);

  Promise
    .all([editUserValidation])
    .then(() => {
      userModel.editUser(req, res, req.body);
    })
    .catch((err) => {
      res.status(500).send({ error: err.details[0].message });
    });
  */
}

module.exports.deleteuser = (req, res) => {
  userModel.deleteUser(req, res);
}
