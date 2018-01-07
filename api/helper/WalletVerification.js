
const models = require('../models');

const CardVerification = require('./CardVerification');
const RelationshipVerification = require('./RelationshipVerification');

class WalletVerification {
  static isWalletValid(walletId) {
    return new Promise((resolve, reject) => {
      models.wallet.findOne({
        where: {
          id: walletId,
        },
      })
        .then((result) => {
          if (result === null) {
            reject('Wallet not registered');
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static hasWalletCards(userId, walletId) {
    return new Promise((resolve, reject) => {
      const isUserWalletRelationshipValid = RelationshipVerification.isUserWalletRelationshipValid(
        userId,
        walletId,
      );

      Promise
        .all([isUserWalletRelationshipValid])
        .then((result) => {
          models.cards.find({
            where: {
              walletid: walletId,
            },
          })
            .then((result) => {
              console.log(result);
              if (result === null) {
                resolve();
              }
              reject('You need to delete your cards before');
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

  static isWalletNewLimitValid (userId, walletId, cardId, newLimit) {
    return new Promise((resolve, reject) => {
      const isCardRegistered = CardVerification.isCardValid(cardId);
      const isEntitiesRelationshipValid = RelationshipVerification.isWalletCardRelationshipValid(
        userId,
        walletId,
        cardId,
      );

      Promise
        .all([isCardRegistered, isEntitiesRelationshipValid])
        .then((isCardRegisteredResult) => {
          models.card.findOne({
            where: {
              id: cardId,
            },
          })
            .then((cardFound) => {
              if (cardFound.maxLimit <= newLimit) {
                resolve();
              } else {
                reject('New limit is greater than max limit of the card');
              }
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

module.exports = WalletVerification;

