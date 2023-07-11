'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeeimmigrationstatus', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      employee: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'immigrationstatus',
          key: 'id'
        }
      }
    }, {
      Sequelize,
      tableName: 'employeeimmigrationstatus',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeeimmigrationstatus');
  }
};