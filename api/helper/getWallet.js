
const models = require('../models');

const getWallet = (walletid) => {
  return new Promise((resolve, reject) => {
    models.wallet.find({
      where: {
        id: walletid,
      },
    })
      .then((result) => {
        resolve(result.dataValues);
      })
      .catch((err) => {
        reject('An error occured during a wallet find');
      });
  });
}

module.exports = getWallet;
