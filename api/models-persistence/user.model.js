
const models = require('../models');

const UserVerification = require('../helper/UserVerification');

class UserDAO {

  static signupUser(req, res, userInputData) {
    const isEmailRegistered = UserVerification.isEmailUsed(userInputData.email);

    Promise
      .all([isEmailRegistered])
      .then(() => {
        models.user.create({
          name: userInputData.name,
          email: userInputData.email,
          password: userInputData.password,
        })
          .then((userCreated) => {
            res.status(201).send({ message: 'User signed up successfully', userId: userCreated.dataValues.id });
          })
          .catch((err) => {
            res.status(500).send({ err });
          });
      })
      .catch((err) => {
        res.status(500).send({ err });
      });
  }

  static authentication(req, res, userToAuthenticate) {
    models.user.find({
      where: {
        email: userToAuthenticate.email,
        password: userToAuthenticate.password,
      },
    })
      .then((authenticationResult) => {
        if (authenticationResult) {
          res.status(200).send({ message: 'User data is valid. User authenticated', userId: authenticationResult.dataValues.id });
        } else {
          res.status(500).send({ err: 'User not found' });
        }
      })
      .catch((err) => {
        res.status(500).send({ err });
      });
  };

  static editUser(req, res, userUpdateInfo) {
    const isUserRegistered = UserVerification.isUserValid(req.params.userid);

    Promise
      .all([isUserRegistered])
      .then(() => {
        const selector = {
          where: {
            id: req.params.userid,
          },
        };
        models.user.update(
          userUpdateInfo, 
          selector,
        )
          .then(() => {
            res.status(200).send({ message: 'User information updated' });
          })
          .catch((err) => {
            res.status(500).send({ err });
          });
      })
      .catch((err) => {
        res.status(500).send({ err });
      });
  }

  static deleteUser(req, res) {
    const isUserRegistered = UserVerification.isUserValid(req.params.userid);
    const hasUserWallets = UserVerification.hasUserWallets(req.params.userid);

    Promise
      .all([isUserRegistered, hasUserWallets])
      .then(() => {
        models.user.destroy({
          where: {
            id: req.params.userid,
          },
        })
          .then(() => {
            res.status(200).send({ message: 'User deleted successfully' });
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

module.exports = () => new UserDAO();
