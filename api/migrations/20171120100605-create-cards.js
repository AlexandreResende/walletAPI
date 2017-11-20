'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING
      },
      ownername: {
        type: Sequelize.STRING
      },
      cvv: {
        type: Sequelize.STRING
      },
      limit: {
        type: Sequelize.DOUBLE
      },
      duedate: {
        type: Sequelize.INTEGER
      },
      expirationdate: {
        type: Sequelize.STRING
      },
      walletid: {
        type: Sequelize.INTEGER
      },
      purchased: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cards');
  }
};