'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Subcategories', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'active' // You can set a default value if needed
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Subcategories', 'status');
  }
};
