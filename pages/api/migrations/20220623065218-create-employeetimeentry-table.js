'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeetimeentry', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      project: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "projects",
          key: "id",
        },
      },
      employee: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "employees",
          key: "id",
        },
      },
      timesheet: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "employeetimesheets",
          key: "id",
        },
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      date_start: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      time_start: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      date_end: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      time_end: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("Active", "Inactive"),
        allowNull: true,
        defaultValue: "Active",
      },
    },
    {
      Sequelize,
      tableName: "employeetimeentry",
      schema: "public",
      timestamps: false,
    });
    let indexes = [
        {
          name: "employee_project",
          fields: [{ name: "employee" }, { name: "project" }],
        },
        {
          name: "employee_project_date_start",
          fields: [
            { name: "employee" },
            { name: "project" },
            { name: "date_start" },
          ],
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'employeetimeentry');

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeetimeentry');
  }
};