
const models = require('../models');

const CardVerification = require('../helper/CardVerification');
const WalletVerification = require('../helper/WalletVerification');
const RelationshipVerification = require('../helper/RelationshipVerification');

class Card {
  static getcards(req, res) {
    models.cards.findAll({
      where: {
        walletid: req.params.walletid,
      },
    })
      .then((result) => {
        res.status(200).send({ result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: 'An error occurred with getcards' });
      });
  }

  static addcard(req, res, cardInfo) {
    const isWalletRegistered = WalletVerification.isWalletValid(req.params.walletid);
    const isCardRegistered = CardVerification.isCardNumberRegistered(cardInfo.number);

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
          purchased: 0,
        })
          .then((resultCard) => {
            models.wallet.find({
              where: {
                id: req.params.walletid,
              },
            })
              .then(() => {
                result.increment(['maxlimit'], { by: cardInfo.limit });
                res.status(200).send({ resultCard });
              })
              .catch(() => {
                res.status(500).send({ error: 'An error occurred when finding the wallet to update its maxlimit' });
              });
          })
          .catch(() => {
            res.status(500).send({ error: 'An error occurred when creating the card' });
          });
      })
      .catch(() => {
        res.status(500).send({ error: 'An error occurred with addcard' });
      });
  }

  static editcard(req, res, newCardInfo) {
    const isCardRegistered = CardVerification.isCardValid(req.params.cardid);

    Promise
      .all([isCardRegistered])
      .then(() => {
        models.cards.update(
          newCardInfo,
          {
            where: {
              id: req.params.cardid,
            },
          },
        )
          .then(() => {
            res.status(200).send({ message: 'Card edited successfully' });
          })
          .catch(() => {
            res.status(500).send({ error: 'An error occurred when updating the card' });
          });
      })
      .catch(() => {
        res.status(500).send({ error: 'An error occurred with editcard' });
      });
  }

  static deletecard(req, res) {
    const isCardRegistered = CardVerification.isCardValid(req.params.cardid);

    Promise
      .all([isCardRegistered])
      .then(() => {
        models.cards.destroy({
          where: {
            id: req.params.cardid,
          },
        })
          .then(() => {
            res.status(200).send({ message: 'Card deleted successfully' });
          })
          .catch(() => {
            res.status(500).send({ error: 'An error occurred when deleting the card' });
          });
      })
      .catch(() => {
        res.status(500).send({ error: 'An error occurred with deletecard' });
      });
  }

  static releasecredit(req, res) {
    const isCardRegistered = CardVerification.isCardValid(req.params.cardid);
    const oldPurchasedValue = new Promise((resolve, reject) => {
      models.cards.find({
        where: {
          id: req.params.cardid,
        },
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
      .then(() => {
        models.cards.update(
          {
            purchased: 0,
          },
          {
            where: {
              id: req.params.cardid,
            },
          },
        )
          .then((result) => {
            const oldPurchased = result[1];
            models.wallet.find({
              where: {
                id: req.params.walletid,
              },
            })
              .then(() => {
                result.decrement(['totalpurchased'], { by: oldPurchased });
                res.status(200).send({ message: 'Credit released successfully' });
              })
              .catch(() => {
                res.status(500).send({ error: 'An error occurred when finding a wallet to update its total purchased' });
              });
          })
          .catch(() => {
            res.status(500).send({ error: 'An error occurred when updating the purchase in releasecredit' });
          });
      })
      .catch(() => {
        res.status(500).send({ error: 'An error occurred with releasecredit' });
      });
  }

  static editlimit(req, res) {
    const newLimit = req.body.limit;
    const isCardRegistered = CardVerification.isCardValid(req.params.cardid);
    const isEntitiesRelationshipValid = RelationshipVerification.isWalletCardRelationshipValid(
      req.params.userid,
      req.params.walletid,
      req.params.cardid,
    );

    Promise
      .all([isCardRegistered, isEntitiesRelationshipValid])
      .then(() => {
        models.cards.findOne({
          where: {
            id: req.params.cardid,
          },
        })
          .then((editLimitResult) => {
            const oldLimit = editLimitResult.dataValues.limit;
            //editLimitResult is an Instance (row) of the table ""cards""
            //do not forget to Save after changing ans instance
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
              .catch(() => {
                res.status(500).send({ error: 'An error occurred when finding a wallet to edit its maxlimit in editlimit' });
              });
          })
          .catch(() => {
            res.status(500).send({ error: 'An error occurred when finding a card in editlimit' });
          });
      })
      .catch(() => {
        res.status(500).send({ error: 'An error occurred with editlimit' });
      });
  }
}

module.exports = Card;
