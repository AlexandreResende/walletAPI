
const models = require('../models');

const paymentRule = require('../helper/paymentRule');
const getWallet = require('../helper/getWallet');
const {
  isWalletValid,
  hasWalletCards,
  isWalletNewLimitValid,
} = require('../helper/WalletVerification');
const RelationshipVerification = require('../helper/RelationshipVerification');

module.exports.getwallets = (req, res) => {
  models.wallet.findAll({
    where: {
      userid: req.params.userid,
    },
  })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(500).json(
        {
          message: 'An error occurred when trying to retrieve wallets',
          error: err,
        },
      );
    });
}

module.exports.addwallet = (req, res, walletInfo) => {
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
      res.status(500).json(
        {
          message: 'An error occurred when adding a wallet',
          error: err,
        },
      );
    });
}

module.exports.editwallet = (req, res, newName) => {
  const isWalletValidResponse = isWalletValid(req.params.walletid);
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
          res.status(200).send({message: 'Wallet information updated' });
        })
        .catch((err) => {
          res.status(500).json(
            {
              message: 'An error occurred when updating the wallet',
              error: err,
            },
          );
        });
    })
    .catch((err) => {
      res.status(500).json(
        {
          message: 'An error occured in edit wallet',
          error: err,
        },
      );
    });
}

module.exports.deletewallet = (req, res) => {
  const isWalletValidResponse = isWalletValid(req.params.walletid);
  const hasWalletCardsResponse = hasWalletCards(req.params.userid, req.params.walletid);

  isWalletValidResponse.then(console.log).catch(console.log);
  hasWalletCardsResponse.then(console.log).catch(console.log);

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
        .catch((err) => {
          res.status(500).json(
            {
              message: 'An error occurred when deleting a wallet',
              error: err,
            },
          );
        });
    })
    .catch((err) => {
      res.status(500).send(
        {
          message: 'An error occurred on delete wallet',
          error: err,
        },
      );
    });
}

module.exports.getlimit = (req, res) => {
  const isWalletValidResponse = isWalletValid(req.params.walletid);

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
        .catch((err) => {
          res.status(500).send(
            {
              message: 'An error occurred when retrieving the limit of the wallet',
              error: err,
            },
          );
        });
    })
    .catch((err) => {
      res.status(500).send(
        {
          message: 'An error occurred when getting the limit of the wallet',
          error: err,
        },
      );
    });
}

module.exports.editlimit = (req, res, newLimit) => {
  const isWalletValidResponse = isWalletValid(req.params.walletid);

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
              .catch((err) => {
                res.status(500).send(
                  {
                    message: 'An error occurred when updating the wallet limit',
                    error: err,
                  },
                );
              });
          }
        })
        .catch((err) => {
          res.status(500).send(
            {
              message: 'An error occurred when getting wallet for up dating its limit',
              error: err,
            },
          );
        });
    })
    .catch((err) => {
      res.status(500).send(
        {
          message: 'An error occurred when editing the limit of the wallet',
          error: err,
        },
      );
    });
}
