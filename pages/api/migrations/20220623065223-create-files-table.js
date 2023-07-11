'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('files', {
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
      filename: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: "files_filename_key"
      },
      employee: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      file_group: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      size: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      size_text: {
        type: Sequelize.STRING(20),
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'files',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
      {
        name: "files_filename_key",
        unique: true,
        fields: [
          { name: "filename" },
        ]
      },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'files');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('files');
  }
};