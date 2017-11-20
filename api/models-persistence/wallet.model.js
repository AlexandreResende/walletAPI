
const models = require('../models');

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
    models.wallet.find({
      id: walletid
    })
    .then((result) => {
      return result.dataValues;
    })
    .catch((err) => {
      throw new Error('An error occured during a wallet find');
    });
  }

  addwallet(req, res, walletInfo) {
    models.wallet.create({
      name: walletInfo.name,
      limit: 0,
      maxlimit: 0,
      userid: req.params.userid
    })
    .then((result) => {
      console.log(result.dataValues);
      res.status(200).json({ result });
    })
    .catch((err) => {
      console.log(err);
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
    models.wallet.delete({
      id: req.params.walletid
    })
    .then((result) => {
      res.status(200).send({message: 'Wallet deleted'});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    });
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
    const { maxlimit } = this.getwallet(req.params.walletid);
    const selector = {
      where: {
        id: req.params.walletid
      }
    };
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

}

module.exports = () => {
  return new Wallet();
}