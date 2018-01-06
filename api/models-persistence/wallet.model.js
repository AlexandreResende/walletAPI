
const models = require('../models');

const paymentRule = require('../helper/paymentRule');
const WalletVerification = require('../helper/WalletVerification');
const RelationshipVerification = require('../helper/RelationshipVerification');

class Wallet {
  static getwallets(req, res) {
    models.wallet.findAll({
      where: {
        userid: req.params.userid,
      },
    })
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  static getwallet(walletid) {
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

  static addwallet(req, res, walletInfo) {
    models.wallet.create({
      name: walletInfo.name,
      limit: 0,
      maxlimit: 0,
      totalpurchased: 0,
      userid: req.params.userid,
    })
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((err) => {
        res.status(500).json({ error: 'An error occurred' });
      });
  }

  static editwallet(req, res, newName) {
    const isWalletValid = WalletVerification.isWalletValid(req.params.walletid);
    const isUserWalletRelationshipValid = RelationshipVerification.isisUserWalletRelationshipValid(
      req.params.userid,
      req.params.walletid,
    );
    const selector = {
      where: {
        id: req.params.walletid,
      },
    };

    Promise
      .all([isWalletValid, isUserWalletRelationshipValid])
      .then(() => {
        models.wallet.update(
          newName,
          selector,
        )
          .then(() => {
            res.status(200).send({ message: 'Wallet information updated' });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  static deletewallet(req, res) {
    const isWalletValid = WalletVerification.isWalletValid(req.params.walletid);
    const hasWalletCards = WalletVerification.hasWalletCards(req.params.walletid);

    Promise
      .all([isWalletValid, hasWalletCards])
      .then(() => {
        models.wallet.destroy({
          where: {
            id: req.params.walletid,
          },
        })
          .then(() => {
            res.status(200).send({ message: 'Wallet deleted' });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  }

  static getlimit(req, res) {
    const isWalletValid = WalletVerification.isWalletValid(req.params.walletid);

    Promise
      .all([isWalletValid])
      .then(() => {
        models.wallet.find({
          where: {
            id: req.params.walletid,
          },
        })
          .then((result) => {
            res.status(200).json({ limit: result.dataValues.limit });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred' });
          });
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  }

  static editlimit(req, res, newLimit) {
    const isWalletValid = WalletVerification.isWalletValid(req.params.walletid);

    Promise
      .all([isWalletValid])
      .then(() => {
        this
          .getwallet(req.params.walletid)
          .then((walletData) => {
            const { maxlimit } = walletData;
            const selector = {
              where: {
                id: req.params.walletid,
              },
            };

            if (newLimit.limit > maxlimit) {
              res.status(500).send({ error: 'Wallet new limit cannot be bigger than its max limit' });
            } else {
              models.wallet.update(
                newLimit,
                selector,
              )
                .then(() => {
                  res.status(200).send({ message: 'Limit information updated' });
                })
                .catch((err) => {
                  res.status(500).json({ error: err });
                });
            }
          })
          .catch((err) => {
            res.status(500).send({ error: err });
          });
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  }
}

module.exports = () => new Wallet();
