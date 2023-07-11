'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('educationlevel', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(250),
        allowNull: false,
        defaultValue: ""
      }
    }, {
      Sequelize,
      tableName: 'educationlevel',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('educationlevel');
  }
};