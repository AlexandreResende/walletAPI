'use strict';
module.exports = (sequelize, DataTypes) => {
  var usuario = sequelize.define('usuario', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usuario;
};