
const models = require('../models');
const Verification = require('../helper/verification');
class Card {

  constructor() {}

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
    const isWalletRegistered = Verification().isWalletValid(req.params.walletid);
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
    const isCardRegistered = Verification().isCardValid(req.params.cardid);

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
    const isCardRegistered = Verification().isCardValid(req.params.cardid);

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
    const isEntitiesRelationshipValid = Verification().walletCardRelationshipValid(
      req.params.cardid, 
      req.params.walletId, 
      req.params.cardId
    );
    
    Promise
      .all([isCardRegistered])
      .then((promisesResult) => {
        models.cards.findOne({
          where: {
            id: req.params.cardid,
          },
        })
        .then((editLimitResult) => {
          const oldLimit = editLimitResult.dataValues.limit;
          //editLimitResult is an Instance (row) of the table ""cards""
          //do not forget to SAve after changing ans instance
          editLimitResult.set('limit', newLimit).save();
          models.wallet.findOne({
            where: {
              id: req.params.walletid,
            },
          })
            .then((walletResult) => {
              walletResult.increment(['maxlimit'], { by: newLimit - oldLimit });
              res.status(200).send({ message: 'Limit of the card updated successfully' });
            })
            .catch((err) => {
              res.status(500).send({ err });
            });
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
