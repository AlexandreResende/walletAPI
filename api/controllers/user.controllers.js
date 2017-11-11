
module.exports.getuser = (req, res) => {
  res.status(200).json({message: 'Getting user'});
}

module.exports.signup = (req, res) => {
  res.status(200).json({message: 'Signing up user'});
}

module.exports.edituser = (req, res) => {
  res.status(200).json({message: 'Editing user'});
}