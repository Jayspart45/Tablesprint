'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Categories', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'active' // Default value, adjust as needed
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Categories', 'status');
  }
};
