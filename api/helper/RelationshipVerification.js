
const models = require('../models');

const UserVerification = require('./UserVerification');
const CardVerification = require('./CardVerification');
const WalletVerification = require('./WalletVerification');

class Verification {
  static isUserWalletRelationshipValid(userId, walletId) {
    return new Promise((resolve, reject) => {
      const isUserRegistered = UserVerification.isUserValid(userId);
      const isWalletRegistered = WalletVerification.isWalletValid(walletId);

      Promise
        .all([isUserRegistered, isWalletRegistered])
        .then((result) => {
          models.wallet.findOne({
            where: {
              id: walletId,
            },
          })
            .then((result) => {
              if (result.userid !== userId) {
                reject(new Error('User wallet relationship does not exist'));
              }
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  isWalletCardRelationshipValid(userId, walletId, cardId) {
    return new Promise((resolve, reject) => {
      const isCardRegistered = CardVerification.isCardValid(cardId);
      const isisUserWalletRelationshipValid = this.isUserWalletRelationshipValid(userId, walletId);

      Promise
        .all([isCardRegistered, isisUserWalletRelationshipValid])
        .then((result) => {
          models.cards.findOne({
            where: {
              id: cardId,
            },
          })
            .then((result) => {
              if (result.walletid !== walletId) {
                reject(new Error('Wallet card relationship does not exist'));
              }
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = () => new Verification();