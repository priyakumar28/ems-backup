'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dataimportfiles', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      data_import_definition: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      status: {
        type: Sequelize.STRING(15),
        allowNull: true
      },
      file: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created: {
        type: Sequelize.DATE,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'dataimportfiles',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dataimportfiles');
  }
};