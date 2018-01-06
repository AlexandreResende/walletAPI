
const models = require('../models');

class CardVerification {
  static isCardValid(cardId) {
    return new Promise((resolve, reject) => {
      models.cards.findOne({
        where: {
          id: cardId,
        },
      })
        .then((result) => {
          if (result === null) {
            reject('Card not registered');
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static isCardNumberRegistered(cardNumber) {
    return new Promise((resolve, reject) => {
      models.cards.findOne({
        where: {
          number: cardNumber,
        },
      })
        .then((result) => {
          if (result !== null) {
            reject('Card already registered');
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = () => new CardVerification();
