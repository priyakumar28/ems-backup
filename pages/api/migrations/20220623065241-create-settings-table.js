'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('settings', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: "settings_name_key"
      },
      value: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      meta: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'settings',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
         {
          name: "settings_name_key",
          unique: true,
          fields: [
            { name: "name" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'settings');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('settings');
  }
};