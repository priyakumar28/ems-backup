'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeeethnicity', {
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
      ethnicity: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'ethnicity',
          key: 'id'
        }
      }
    }, {
      Sequelize,
      tableName: 'employeeethnicity',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeeethnicity');
  }
};