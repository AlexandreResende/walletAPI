
const models = require('../models');

class UserDAO {

  constructor() {}

  signupUser(req, res, userInputData) {
    const email = userInputData.email;

    const isEmailRegistered = new Promise((resolve, reject) => {
      models.user.find({
        where: {
          email
        }
      })
        .then((result) => {
          if (result === null) {
            resolve();
          }
          reject({error: 'Email already registered'});
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ err });
        });
    });

    Promise
      .all([isEmailRegistered])
      .then((result) => {
        models.user.create({
          name: userInputData.name,
          email: userInputData.email,
          password: userInputData.password
        })
          .then((result) => {
            //console.log(result.dataValues);
            res.status(201).send({message: 'User signed up successfully'});
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

  authentication(req, res, userToBeFound) {
    models.user.find({
      where: {
        email: userToBeFound.email,
        password: userToBeFound.password
      }
    })
      .then((result) => {
        if (result) {
          res.status(200).send({message: 'User data is valid'});
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
  }

  deleteUser(req, res) {
    const hasUserWallets = new Promise((resolve, reject) => {
      models.wallet.find({
        where: {
          userid: req.params.userid
        }
      })
        .then((result) => {
          if (result){
            reject('You need to delete your wallets before');
          }
          resolve();
        })
        .catch((err) => {
          res.status(500).send({ err });
        });
    });

    Promise
      .all([hasUserWallets])
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