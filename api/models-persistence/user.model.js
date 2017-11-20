
const models = require('../models');

class UserDAO {

  constructor() {}

  signupUser(req, res, userInputData) {
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
        res.status(500).send({error: 'An error occurred'});
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
          throw new Error('User not found');
        }
      })
      .catch((err) => {
        res.status(500).send({error: 'An error occurred'});
      });
  };

  edituser(req, res, userUpdateInfo) {
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
      res.status(500).send({error: 'An error occurred'});
    });
  }

  deleteuser(req, res) {
    models.user.destroy({
      where: {
        id: req.params.userid
      }
    })
    .then((result) => {
      res.status(200).send({message: 'User deleted successfully'});
    })
    .catch((err) => {
      res.status(500).send({error: 'An error occurred'});
    });
  }
}

module.exports = () => {
  return new UserDAO();
}