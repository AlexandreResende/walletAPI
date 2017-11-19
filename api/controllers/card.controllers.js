
module.exports.getcards = (req, res) => {
  res.status(200).json({message: 'Getting cards'});
};

module.exports.addcard = (req, res) => {
  res.status(200).json({message: 'Adding card'});
};

module.exports.editcard = (req, res) => {
  res.status(200).json({message: 'Editing card'});
};

module.exports.deletecard = (req, res) => {
  res.status(200).json({message: 'Deleting card'});
};
