'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notifications', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      time: {
        type: Sequelize.DATE,
        allowNull: true
      },
      fromuser: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      fromemployee: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      touser: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      image: {
        type: Sequelize.STRING(500),
        allowNull: true,
        defaultValue: null
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      action: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      type: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM("Unread", "Read"),
        allowNull: true,
        defaultValue: "Unread"
      },
      employee: {
        type: Sequelize.BIGINT,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'notifications',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "touser_status_time",
          fields: [
            { name: "touser" },
            { name: "status" },
            { name: "time" },
          ]
        },
        {
          name: "touser_time",
          fields: [
            { name: "touser" },
            { name: "time" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'notifications');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('notifications');
  }
};