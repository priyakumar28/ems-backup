'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('timezones', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: ""
      },
      details: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: ""
      }
    }, {
      Sequelize,
      tableName: 'timezones',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('timezones');
  }
};