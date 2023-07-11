'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeeprojects', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      employee: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        },
        unique: "employeeprojects_employee_project_key"
      },
      project: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'projects',
          key: 'id'
        },
        unique: "employeeprojects_employee_project_key"
      },
      date_start: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      date_end: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM("Current", "Inactive", "Completed"),
        allowNull: true,
        defaultValue: "Current"
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      bill_type: {
        type: Sequelize.ENUM("Billable", "Non Billable"),
        allowNull: true
      },
      bill_percent: {
        type: Sequelize.DECIMAL(100),
        allowNull: true
      },
      comments: {
        type: Sequelize.TEXT(250),
        allowNull: true
      }

    }, {
      Sequelize,
      tableName: 'employeeprojects',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "employeeprojects_employee_project_key",
          unique: true,
          fields: [
            { name: "employee" },
            { name: "project" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'employeeprojects');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeeprojects');
  }
};