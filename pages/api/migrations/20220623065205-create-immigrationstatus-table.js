'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('immigrationstatus', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    }, {
      Sequelize,
      tableName: 'immigrationstatus',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('immigrationstatus');
  }
};