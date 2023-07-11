'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeetimesheets', {
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
        unique: "employeetimesheets_employee_date_start_date_end_key",
      },
      date_start: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        unique: "employeetimesheets_employee_date_start_date_end_key",
      },
      date_end: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        unique: "employeetimesheets_employee_date_start_date_end_key",
      },
      status: {
        type: Sequelize.ENUM("Approved", "Pending", "Rejected", "Submitted"),
        allowNull: true,
        defaultValue: "Pending",
      },
      comments: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    },
    {
      Sequelize,
      tableName: "employeetimesheets",
      schema: "public",
      timestamps: false,
    });
    let indexes = [
        {
          name: "employeetimesheets_date_end",
          fields: [{ name: "date_end" }],
        },
        {
          name: "employeetimesheets_employee_date_start_date_end_key",
          unique: true,
          fields: [
            { name: "employee" },
            { name: "date_start" },
            { name: "date_end" },
          ],
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'employeetimesheets');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeetimesheets');
  }
};