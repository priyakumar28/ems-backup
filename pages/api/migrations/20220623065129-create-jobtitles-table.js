'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jobtitles', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      code: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: ""
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null
      },
      description: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: null
      },
      specification: {
        type: Sequelize.STRING(400),
        allowNull: true,
        defaultValue: null
      }
    }, {
      Sequelize,
      tableName: 'jobtitles',
      schema: 'public',
      timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jobtitles');
  }
};