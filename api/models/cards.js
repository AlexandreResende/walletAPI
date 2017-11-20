'use strict';
module.exports = (sequelize, DataTypes) => {
  var cards = sequelize.define('cards', {
    number: DataTypes.STRING,
    ownername: DataTypes.STRING,
    cvv: DataTypes.STRING,
    limit: DataTypes.DOUBLE,
    duedate: DataTypes.INTEGER,
    expirationdate: DataTypes.STRING,
    walletid: DataTypes.INTEGER,
    purchased: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        cards.belongsTo(models.wallet, { foreignKey: 'walletid', foreignKeyConstraint: true });
      }
    }
  });
  return cards;
};