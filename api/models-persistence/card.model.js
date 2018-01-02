
const models = require('../models');
const Verification = require('../helper/verification');
class Card {

  constructor() {}

  verifyWallet(walletId) {
    return new Promise((resolve, reject) => {
      models.wallet.findOne({
        where: {
          id: walletId
        }
      })
        .then((result) => {
          if (result === null) {
            reject('Wallet does not exist');
          }
          resolve();
        })
    });
  }

  verifyCard(cardId) {
    return new Promise((resolve, reject) => {
      models.cards.findOne({
        where: {
          id: cardId
        }
      })
        .then((result) => {
          console.log('Result: ' + result);
          if (result === null) {
            reject('Card does not exist');
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getcards(req, res) {
    models.cards.findAll({
      where : {
        walletid: req.params.walletid
      }
    })
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ err });
    });
  }

  addcard(req, res, cardInfo) {
    const isWalletRegistered = this.verifyWallet(req.params.walletid);
    const isCardRegistered = Verification().isCardNumberRegistered(cardInfo.number);

    Promise
      .all([isWalletRegistered, isCardRegistered])
      .then((result) => {
        models.cards.create({
          number: cardInfo.number,
          ownername: cardInfo.ownername,
          cvv: cardInfo.cvv,
          limit: cardInfo.limit,
          walletid: req.params.walletid,
          duedate: cardInfo.duedate,
          expirationdate: cardInfo.expirationdate,
          purchased: 0
        })
        .then((resultCard) => {
          models.wallet.find({
            where: {
              id: req.params.walletid
            }
          })
            .then((result) => {
              result.increment(['maxlimit'], { by: cardInfo.limit });
              res.status(200).send({ resultCard });
            })
            .catch((err) => {
              res.status(500).send({ err });
            });
        })
        .catch((err) => {
          res.status(500).send({ error: 'An error occurred' });
        });
      })
    .catch((err) => {
      res.status(500).send({ err });
    });
  }

  editcard(req, res, newCardInfo) {
    const isCardRegistered = this.verifyCard(req.params.cardid);

    Promise
      .all([isCardRegistered])
      .then((result) => {
        models.cards.update(
          newCardInfo,
          {
            where: {
              id: req.params.cardid
            }
          }
        )
        .then((result) => {
          console.log(result.dataValues);
          res.status(200).send({ message: 'Card edited successfully' });
        })
        .catch((err) => {
          res.status(500).send({ error: 'An error occurred' });
        });
      })
      .catch((err) => {
        res.status(500).send({ err });
      });
  }

  deletecard(req, res) {
    const isCardRegistered = this.verifyCard(req.params.cardid);

    Promise
      .all([isCardRegistered])
      .then((result) => {
        models.cards.destroy({
          where: {
            id: req.params.cardid
          }
        })
        .then((result) => {
          res.status(200).send({ message: 'Card deleted successfully' });
        })
        .catch((err) => {
          res.status(500).send({ err });
        });
      })
      .catch((err) => {
        res.status(500).send({ err });
      });
  }

  releasecredit(req, res) {
    const isCardRegistered = Verification().isCardValid(req.params.cardid);
    const oldPurchasedValue = new Promise((resolve, reject) => {
      models.cards.find({
        where: {
          id: req.params.cardid
        }
      })
        .then((result) => {
          resolve(result.dataValues.purchased);
        })
        .catch((err) => {
          reject(err);
        });
    });
    
    Promise
      .all([isCardRegistered, oldPurchasedValue])
      .then((result) => {
        console.log(result);
        models.cards.update({
          purchased: 0
        },{
          where: {
            id: req.params.cardid
          }
        })
        .then((result) => {
          const oldPurchased = result[1];
          models.wallet.find({
            where: {
              id: req.params.walletid
            }
          })
          .then((result) => {
            result.decrement(['totalpurchased'], { by: oldPurchased });
            res.status(200).send({ message: 'Credit released successfully' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({ err });
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ err });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ err });
      });
  }

  editlimit(req, res) {
    const newLimit = req.body.limit;
    const isCardRegistered = Verification().isCardValid(req.params.cardid);
    const isNewLimitValid = Verification().isNewLimitValid(cardId, newLimit)
    
    Promise
      .all([isCardRegistered])
      .then((promisesResult) => {
        models.cards.update({
          limit: newLimit
        },{
          where: {
            id: req.params.cardid
          }
        })
        .then((editLimitResult) => {
          res.status(200).send({ message: 'Limit of the card updated successfully' });
        })
        .catch((err) => {
          res.status(500).send({ err });
        });
      })
      .catch((err) => {
        res.status(500).send({ err });
      });
  }
}

module.exports = () => {
  return new Card();
}
