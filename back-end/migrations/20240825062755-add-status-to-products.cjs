'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'active' // Default value, adjust as needed
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'status');
  }
};
