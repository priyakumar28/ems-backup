'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employmentstatus', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null
      },
      description: {
        type: Sequelize.STRING(400),
        allowNull: true,
        defaultValue: null
      }
    }, {
      Sequelize,
      tableName: 'employmentstatus',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employmentstatus');
  }
};