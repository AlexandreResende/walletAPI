
const models = require('../models');
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

  getcards() {
    models.cards.findAll({
      walletid: req.params.walletid
    })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred when finding a used card' });
    });
  }

  addcard(req, res, cardInfo) {
    const isWalletRegistered = this.verifyWallet(req.params.walletid);
    const isCardRegistered = new Promise((resolve, reject) => {
      models.cards.find({
        where: {
          number: cardInfo.number
        }
      })
        .then((result) => {
          if (result === null) {
            resolve()
          } else {
            reject('Card already being used');
          }
        })
        .catch((err) => {
          res.status(500).json({ error: 'An error occurred' });
        });
    });

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
        .then((result) => {
          res.status(200).json({ result });
        })
        .catch((err) => {
          res.status(500).json({ error: 'An error occurred' });
        });
      })
    .catch((err) => {
      res.status(500).json({ error: err });
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
          res.status(200).json({ result });
        })
        .catch((err) => {
          res.status(500).json({ error: 'An error occurred' });
        });
      })
      .catch((err) => {
        res.status(500).json({ error: 'An error occurred' });
      });
  }

  deletecard(req, res) {
    const isCardRegistered = this.verifyCard(req.params.cardid);

    Promise
      .all([isCardRegistered])
      .then((result) => {
        models.cards.delete({
          id: req.params.cardid
        })
        .then((result) => {
          console.log(result.dataValues);
          res.status(200).json({ result });
        })
        .catch((err) => {
          res.status(500).json({ error: 'An error occurred' });
        });
      })
      .catch((err) => {
        res.status(500).json({ error: 'An error occurred' });
      });
  }

}

module.exports = () => {
  return new Card();
}