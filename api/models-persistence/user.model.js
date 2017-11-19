
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
      console.log(result.dataValues);
      res.status(201).send({message: 'User signed up successfully'});
    })
    .catch((err) => {
      res.status(500).send({error: 'An error occurred'});
    });
  }

}

module.exports = () => {
  return new UserDAO();
}