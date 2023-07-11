'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('salarycomponent', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      componenttype: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'salarycomponenttype',
          key: 'id'
        }
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'salarycomponent',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('salarycomponent');
  }
};