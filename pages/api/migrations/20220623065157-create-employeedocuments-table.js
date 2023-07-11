'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeedocuments', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      employee: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "employees",
          key: "id",
        },
      },
      document: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "documents",
          key: "id",
        },
      },
      name: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      date_added: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      valid_until: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("Active", "Inactive", "Draft"),
        allowNull: true,
        defaultValue: "Active",
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      attachment: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      signature: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      expire_notification_last: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      approvalstatus: {
        type: Sequelize.ENUM("Approved", "Pending", "Rejected"),
        allowNull: true,
        defaultValue: "Pending",
      }
    },
      {
        Sequelize,
        tableName: "employeedocuments",
        schema: "public",
        timestamps: false,
      });
    let indexes = [
      {
        name: "key_employeedocuments_valid_until",
        fields: [{ name: "valid_until" }],
      },
      {
        name: "key_employeedocuments_valid_until_status",
        fields: [
          { name: "valid_until" },
          { name: "status" },
          { name: "expire_notification_last" },
        ],
      },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'employeedocuments');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeedocuments');
  }
};