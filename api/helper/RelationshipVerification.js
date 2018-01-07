
const models = require('../models');

const UserVerification = require('./UserVerification');
const CardVerification = require('./CardVerification');
const WalletVerification = require('./WalletVerification');

class RelationshipVerification {
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
              if (result.userid.toString() !== userId) {
                reject('User wallet relationship does not exist');
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

  static isWalletCardRelationshipValid(userId, walletId, cardId) {
    return new Promise((resolve, reject) => {
      const isUserWalletRelationshipValid = this.isUserWalletRelationshipValid(userId, walletId);

      Promise
        .all([isUserWalletRelationshipValid])
        .then(() => {
          models.cards.findOne({
            where: {
              id: cardId,
            },
          })
            .then((result) => {
              if (result.walletid.toString() !== walletId) {
                reject('Wallet card relationship does not exist');
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

module.exports = RelationshipVerification;
