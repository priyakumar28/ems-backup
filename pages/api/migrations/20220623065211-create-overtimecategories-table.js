'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('overtimecategories', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      created: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'overtimecategories',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('overtimecategories');
  }
};