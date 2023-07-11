'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('modules', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      menu: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: "modules_name_key"
      },
      label: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      icon: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      mod_group: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      mod_order: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM("Enabled", "Disabled"),
        allowNull: true,
        defaultValue: "Enabled"
      },
      version: {
        type: Sequelize.STRING(10),
        allowNull: true,
        defaultValue: ""
      },
      update_path: {
        type: Sequelize.STRING(500),
        allowNull: true,
        defaultValue: ""
      },
      user_levels: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      user_roles: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'modules',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "modules_name_mod_group_key",
          unique: true,
          fields: [
            { name: "name" },
            { name: "mod_group" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'modules');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('modules');
  }
};