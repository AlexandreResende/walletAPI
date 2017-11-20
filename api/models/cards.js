'use strict';
module.exports = (sequelize, DataTypes) => {
  var cards = sequelize.define('cards', {
    number: DataTypes.STRING,
    ownername: DataTypes.STRING,
    cvv: DataTypes.STRING,
    limit: DataTypes.DOUBLE,
    walletid: DataTypes.INTEGER,
    purchased: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return cards;
};