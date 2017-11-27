'use strict';
module.exports = (sequelize, DataTypes) => {
  var wallet = sequelize.define('wallet', {
    name: DataTypes.STRING,
    userid: DataTypes.INTEGER,
    limit: DataTypes.DOUBLE,
    maxlimit: DataTypes.DOUBLE,
    totalpurchased: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        wallet.belongsTo(models.user, { foreignKey: 'userid', foreignKeyConstraint: true });
        wallet.hasMany(models.cards);
      }
    }
  });
  return wallet;
};