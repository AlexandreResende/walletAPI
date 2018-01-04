
const models = require('../models');

class Verification {
  
  isUserValid(userId) {
    return new Promise((resolve, reject) => {
      models.user.findOne({
        where: {
          id: userId
        }
      })
        .then((result) => {
          console.log(result);
          if (result === null) {
            reject('User does not exist')
          }
          resolve();
        });
    });
  }

  isEmailUsed(email) {
    return new Promise((resolve, reject) => {
      models.user.findOne({
        where: {
          email
        }
      })
        .then((result) => {
          if (result === null) {
            resolve();
          }
          reject('Email already in use');
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  isWalletValid(walletId) {
    return new Promise((resolve, reject) => {
      models.wallet.findOne({
        where: {
          id: walletId
        }
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

  hasUserWallets(userId) {
    return new Promise((resolve, reject) => {
      const isUserRegistered = this.isUserValid(userId);
      
      Promise
      .all([isUserRegistered])
      .then((result) => {
        models.wallet.find({
          where: {
            userid: userId
          }
        })
          .then((result) => {
            console.log(result);
            if (result.length !== 0){
              reject('You need to delete your wallets before');
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

  isCardValid(cardId) {
    return new Promise((resolve, reject) => {
      models.cards.findOne({
        where: {
          id: cardId
        }
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

  isCardNumberRegistered(cardNumber) {
    return new Promise((resolve, reject) => {
      models.cards.findOne({
        where: {
          number: cardNumber
        }
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

  hasWalletCards(userId, walletId) {
    return new Promise((resolve, reject) => {
      const isUserWalletRelationshipValid = this.userWalletRelationshipValid(userId, walletId);
      
      Promise
      .all([isUserWalletRelationshipValid])
      .then((result) => {
          models.cards.find({
            where: {
              walletid: walletId
            }
          })
            .then((result) => {
              if (result.length !== 0){
                reject('You need to delete your cards before');
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

  userWalletRelationshipValid(userId, walletId) {
    return new Promise((resolve, reject) => {
      const isUserRegistered = this.isUserValid(userId);
      const isWalletRegistered = this.isWalletValid(walletId);
  
      Promise
        .all([isUserRegistered, isWalletRegistered])
        .then((result) => {
          models.wallet.findOne({
            where: {
              id: walletId
            }
          })
            .then((result) => {
              console.log('VERIFICATION OF RELATIONSHIP USER-WALLET');
              console.log(result);
              if (result.userid !== userId) {
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

  walletCardRelationshipValid(userId, walletId, cardId) {
    return new Promise((resolve, reject) => {
      const isCardRegistered = this.isCardValid(cardId);
      const isUserWalletRelationshipValid = this.userWalletRelationshipValid(userId, walletId); 
  
      Promise
        .all([isCardRegistered, isUserWalletRelationshipValid])
        .then((result) => {
          models.cards.findOne({
            where: {
              id: cardId
            }
          })
            .then((result) => {
              console.log('VERIFICATION OF RELATIONSHIP WALLET-CARD');
              console.log(result);
              if (result.walletid !== walletId) {
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
        })
    });
  }

  //method for the wallet for editing the limit
  isWalletNewLimitValid(userId, walletId, cardId, newLimit) {
    return new Promise((resolve, reject) => {
      const isCardRegistered = this.isCardValid(cardId);
      const isEntitiesRelationshipValid = this.walletCardRelationshipValid(userId, walletId, cardId);
  
      Promise
        .all([isCardRegistered, isEntitiesRelationshipValid])
        .then((isCardRegisteredResult) => {
          models.card.findOne({
            where: {
              id: cardId
            }
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

module.exports = () => new Verification();