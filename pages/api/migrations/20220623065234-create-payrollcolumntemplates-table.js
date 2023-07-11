'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payrollcolumntemplates', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null
      },
      columns: {
        type: Sequelize.STRING(500),
        allowNull: true,
        defaultValue: null
      }
    }, {
      Sequelize,
      tableName: 'payrollcolumntemplates',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payrollcolumntemplates');
  }
};