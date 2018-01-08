
const models = require('../models');

const paymentRule = require('../helper/paymentRule');
const getWallet = require('../helper/getWallet');
const WalletVerification = require('../helper/WalletVerification');
const RelationshipVerification = require('../helper/RelationshipVerification');

module.exports.getwallets = (req, res) => {
  models.wallet.findAll({
    where: {
      userid: req.params.userid,
    },
  })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch(() => {
      res.status(500).json({ error: 'An error occurred with getwallets' });
    });
};

module.exports.addwallet = (req, res, walletInfo) => {
  models.wallet.create({
    name: walletInfo.name,
    limit: 0,
    maxlimit: 0,
    totalpurchased: 0,
    userid: req.params.userid,
  })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch(() => {
      res.status(500).json({ error: 'An error occurred with addwallet' });
    });
};

module.exports.editwallet = (req, res, newName) => {
  const isWalletValidResponse = WalletVerification.isWalletValid(req.params.walletid);
  const isUserWalletRelationshipValid = RelationshipVerification.isUserWalletRelationshipValid(
    req.params.userid,
    req.params.walletid,
  );
  const selector = {
    where: {
      id: req.params.walletid,
    },
  };

  Promise
    .all([isWalletValidResponse, isUserWalletRelationshipValid])
    .then(() => {
      models.wallet.update(
        newName,
        selector,
      )
        .then(() => {
          res.status(200).send({ message: 'Wallet information updated' });
        })
        .catch(() => {
          res.status(500).json({ error: 'An error occurred when updating the wallet' });
        });
    })
    .catch(() => {
      res.status(500).json({ error: 'An error occured with editwallet' });
    });
};

module.exports.deletewallet = (req, res) => {
  const isWalletValidResponse = WalletVerification.isWalletValid(req.params.walletid);
  const hasWalletCardsResponse = WalletVerification.hasWalletCards(
    req.params.userid,
    req.params.walletid,
  );

  Promise
    .all([isWalletValidResponse, hasWalletCardsResponse])
    .then(() => {
      models.wallet.destroy({
        where: {
          id: req.params.walletid,
        },
      })
        .then(() => {
          res.status(200).send({ message: 'Wallet deleted' });
        })
        .catch(() => {
          res.status(500).json({ error: 'An error occurred when deleting a wallet' });
        });
    })
    .catch(() => {
      res.status(500).send({ error: 'An error occurred with deletewallet' });
    });
};

module.exports.getlimit = (req, res) => {
  const isWalletValidResponse = WalletVerification.isWalletValid(req.params.walletid);

  Promise
    .all([isWalletValidResponse])
    .then(() => {
      models.wallet.find({
        where: {
          id: req.params.walletid,
        },
      })
        .then((result) => {
          res.status(200).json({ limit: result.dataValues.limit });
        })
        .catch(() => {
          res.status(500).send({ error: 'An error occurred when retrieving the limit of the wallet' });
        });
    })
    .catch(() => {
      res.status(500).send({ error: 'An error occurred with getlimit' });
    });
};

module.exports.editlimit = (req, res, newLimit) => {
  const isWalletValidResponse = WalletVerification.isWalletValid(req.params.walletid);

  Promise
    .all([isWalletValidResponse])
    .then(() => {
      getWallet(req.params.walletid)
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
              .catch(() => {
                res.status(500).send({ error: 'An error occurred when updating the wallet limit' });
              });
          }
        })
        .catch(() => {
          res.status(500).send({ error: 'An error occurred when getting the wallet in editlimit' });
        });
    })
    .catch(() => {
      res.status(500).send({ error: 'An error occurred with editlimit' });
    });
};
