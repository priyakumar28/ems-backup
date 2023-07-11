'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('emails', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      subject: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      toemail: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      template: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      params: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      cclist: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      bcclist: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      error: {
        type: Sequelize.STRING(500),
        allowNull: true
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
        type: Sequelize.ENUM("Pending", "Sent", "Error"),
        allowNull: true,
        defaultValue: "Pending"
      }
    }, {
      Sequelize,
      tableName: 'emails',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "key_emails_created",
          fields: [
            { name: "created" },
          ]
        },
        {
          name: "key_emails_status",
          fields: [
            { name: "status" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'emails');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('emails');
  }
};