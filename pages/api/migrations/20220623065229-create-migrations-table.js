'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('migrations', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      file: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: "migrations_file_key"
      },
      version: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM("Pending", "Up", "Down", "UpError", "DownError"),
        allowNull: true,
        defaultValue: "Pending"
      },
      last_error: {
        type: Sequelize.STRING(500),
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'migrations',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "key_migrations_status",
          fields: [
            { name: "status" },
          ]
        },
        {
          name: "key_migrations_version",
          fields: [
            { name: "version" },
          ]
        },
        {
          name: "migrations_file_key",
          unique: true,
          fields: [
            { name: "file" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'migrations');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('migrations');
  }
};