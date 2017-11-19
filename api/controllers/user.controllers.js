
const userModel = require('../models-persistence/user.model');

module.exports.getuser = (req, res) => {
  res.status(200).json({message: 'Getting user'});
}

module.exports.signup = (req, res) => {
  const user = userModel().signupUser(req, res, req.body);
}

module.exports.edituser = (req, res) => {
  res.status(200).json({message: 'Editing user'});
}
