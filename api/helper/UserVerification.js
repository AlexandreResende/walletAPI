
const models = require('../models');

module.exports.isUserValid = (userId) => {
  return new Promise((resolve, reject) => {
    models.user.findOne({
      where: {
        id: userId,
      },
    })
      .then((result) => {
        if (result === null) {
          reject('User does not exist');
        }
        resolve();
      });
  });
}

module.exports.isEmailUsed = (email) => {
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
        reject('Email already in use');
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports.hasUserWallets = (userId) => {
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
            if (result !== null) {
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
