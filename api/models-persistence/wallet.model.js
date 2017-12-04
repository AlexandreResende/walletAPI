
const models = require('../models');
const paymentRule = require('../helper/paymentRule');

class Wallet {

  constructor() {}

  getwallets(req, res) {
    models.wallet.findAll({
      where: {
        userid: req.params.userid
      }
    })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(500).json({ error: 'An error occurred' });
    });
  }

  getwallet(walletid) {
    return new Promise((resolve, reject) => {
      models.wallet.find({
        where: {
          id: walletid
        }
      })
      .then((result) => {
        resolve(result.dataValues);
      })
      .catch((err) => {
        reject('An error occured during a wallet find');
      });
    });
  }

  addwallet(req, res, walletInfo) {
    models.wallet.create({
      name: walletInfo.name,
      limit: 0,
      maxlimit: 0,
      totalpurchased: 0,
      userid: req.params.userid
    })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(500).json({ error: 'An error occurred' });
    });
  }

  editwallet(req, res, newName) {
    const selector = {
      where: {
        id: req.params.walletid
      }
    };
    models.wallet.update(
      newName, 
      selector
    )
    .then((result) => {
      res.status(200).send({message: 'Wallet information updated'});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    });
  }

  deletewallet(req, res) {
    const walletHasCards = new Promise((resolve, reject) => {
      models.cards.find({
        where: {
          walletid: req.params.walletid
        }
      })
        .then((result) => {
          console.log(result);
          if (result == null) {
            resolve();
          } else {
            reject('There are cards in this wallet, delete them');
          }
        })
        .catch((err) => reject(err));
    });

    Promise
      .all([walletHasCards])
      .then((result) => {
        models.wallet.destroy({
          where: {
            id: req.params.walletid
          }
        })
        .then((result) => {
          res.status(200).send({message: 'Wallet deleted'});
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: 'An error occurred' });
        });
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      })
  }

  getlimit(req, res) {
    models.wallet.find({
      where: {
        id: req.params.walletid
      }
    })
    .then((result) => {
      res.status(200).json({ limit: result.dataValues.limit });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    });
  }

  editlimit(req, res, newLimit) {
    this
      .getwallet(req.params.walletid)
      .then((walletData) => {
        const { maxlimit } = walletData;
        const selector = {
          where: {
            id: req.params.walletid
          }
        };

        if (newLimit.limit > maxlimit) {
          res.status(500).send({ error: 'Wallet new limit cannot be bigger than its max limit' });
        } else {
          models.wallet.update(
            newLimit, 
            selector
          )
          .then((result) => {
            res.status(200).send({message: 'Limit information updated'});
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred' });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: err});
      })
  }
}

module.exports = () => {
  return new Wallet();
}