
const userModel = require('../models-persistence/user.model');

module.exports.authentication = (req, res) => {
  const user = userModel().authentication(req, res, req.body);
}

module.exports.signup = (req, res) => {
  const user = userModel().signupUser(req, res, req.body);
}

module.exports.edituser = (req, res) => {
  const user = userModel().edituser(req, res, req.body);
}
