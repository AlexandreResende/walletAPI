
const models = require('../models');
class Card {

  constructor() {}

  getcards() {
    models.cards.findAll({
      walletid: req.params.walletid
    })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(500).json({ error: 'An error occurred when finding a used card' });
    });
  }

  addcard(req, res, cardInfo) {
    const cardNumber = {
      number: cardInfo.number
    }

    const isCardRegistered = new Promise((resolve, reject) => {
      models.cards.find(cardNumber)
        .then((result) => {
          if (result === null) {
            resolve()
          } else {
            reject('Card already being used');
          }
        })
        .catch((err) => {
          res.status(500).json({ error: 'An error occurred when finding a used card' });
        });
    });

    Promise
      .all([isCardRegistered])
      .then((result) => {
        models.cards.create({
          number: cardInfo.number,
          ownername: cardInfo.ownername,
          cvv: cardInfo.cvv,
          limit: cardInfo.limit,
          walletid: req.params.walletid,
          purchased: 0
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
      res.status(500).json({ error: err });
    });
  }

  editcard(req, res, newCardInfo) {
    const selector = {
      where: {
        id: req.params.cardid
      }
    }
    models.cards.update(
      newCardInfo,
      selector
    )
    .then((result) => {
      console.log(result.dataValues);
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(500).json({ error: 'An error occurred' });
    });
  }

  deletecard(req, res) {
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
  }

}

module.exports = () => {
  return new Card();
}