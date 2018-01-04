
const models = require('../models');

class UserVerification {
  static isUserValid(userId) {
    return new Promise((resolve, reject) => {
      models.user.findOne({
        where: {
          id: userId,
        },
      })
        .then((result) => {
          console.log(result);
          if (result === null) {
            reject(new Error('User does not exist'));
          }
          resolve();
        });
    });
  }

  static isEmailUsed(email) {
    return new Promise((resolve, reject) => {
      models.user.findOne({
        where: {
          email,
        },
      })
        .then((result) => {
          if (result === null) {
            resolve();
          }
          reject(new Error('Email already in use'));
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static isWalletValid(walletId) {
    return new Promise((resolve, reject) => {
      models.wallet.findOne({
        where: {
          id: walletId,
        },
      })
        .then((result) => {
          if (result === null) {
            reject(new Error('Wallet not registered'));
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
              userid: userId,
            },
          })
            .then((result) => {
              console.log(result);
              if (result.length !== 0) {
                reject(new Error('You need to delete your wallets before'));
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

module.exports = () => new UserVerification();
