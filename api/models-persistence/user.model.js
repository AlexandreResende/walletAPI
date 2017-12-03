
const models = require('../models');
const Verification = require('../helper/verification');

class UserDAO {

  constructor() {}

  signupUser(req, res, userInputData) {
    const isEmailRegistered = Verification().isEmailUsed(userInputData.email);

    Promise
      .all([isEmailRegistered])
      .then((result) => {
        models.user.create({
          name: userInputData.name,
          email: userInputData.email,
          password: userInputData.password
        })
          .then((result) => {
            res.status(201).send({message: 'User signed up successfully'});
          })
          .catch((err) => {
            res.status(500).send({ err });
          });
      })
      .catch((err) => {
        res.status(500).send({ err });
      });
  }

  authentication(req, res, userToBeFound) {
    models.user.find({
      where: {
        email: userToBeFound.email,
        password: userToBeFound.password
      }
    })
      .then((result) => {
        if (result) {
          res.status(200).send({message: 'User data is valid. User authenticated'});
        } else {
          res.status(500).send({ err: 'User not found' });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ err });
      });
  };

  editUser(req, res, userUpdateInfo) {
    const isUserRegistered = Verification().isUserValid(req.params.userid);

    Promise
      .all([isUserRegistered])
      .then((result) => {
        const selector = {
          where: {
            id: req.params.userid
          }
        };
        models.user.update(
          userUpdateInfo, 
          selector
        )
        .then((result) => {
          res.status(200).send({message: 'User information updated'});
        })
        .catch((err) => {
          res.status(500).send({ err });
        });
      })
      .catch((err) => {
        res.status(500).send({ err });
      });
  }

  deleteUser(req, res) {
    const isUserRegistered = Verification().isUserValid(req.params.userid);
    const hasUserWallets = Verification().hasUserWallets(req.params.userid);

    Promise
    .all([isUserRegistered, hasUserWallets])
    .then((result) => {
      models.user.destroy({
        where: {
          id: req.params.userid
        }
      })
      .then((result) => {
        res.status(200).send({message: 'User deleted successfully'});
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
  return new UserDAO();
}