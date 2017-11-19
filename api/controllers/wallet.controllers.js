
module.exports.getwallets = (req, res) => {
  res.status(200).json({message: 'Getting wallets'});
};

module.exports.addwallet = (req, res) => {
  res.status(200).json({message: 'Adding wallet'});
};

module.exports.editwallet = (req, res) => {
  res.status(200).json({message: 'Editing wallet'});
};

module.exports.deletewallet = (req, res) => {
  res.status(200).json({message: 'Delete wallet'});
};
