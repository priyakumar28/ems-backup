'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: "users_username_key"
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: "users_email_key"
      },
      employee: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      default_module: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      user_level: {
        type: Sequelize.ENUM("Admin", "Employee", "Manager", "Other"),
        allowNull: false,
        defaultValue: "Employee"
      },
      user_roles: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      profile_pic: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true
      },
      last_update: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created: {
        type: Sequelize.DATE,
        allowNull: true
      },
      login_hash: {
        type: Sequelize.STRING(64),
        allowNull: true,
        defaultValue: null
      },
      lang: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'supportedlanguages',
          key: 'id'
        }
      }
    }, {
      Sequelize,
      tableName: 'users',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "login_hash_index",
          fields: [
            { name: "login_hash" },
          ]
        },
        {
          name: "users_username_key",
          unique: true,
          fields: [
            { name: "username" },
          ]
        },
        {
          name: "users_email_key",
          unique: true,
          fields: [
            { name: "email" }
          ]
        }
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'users');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};