'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeeattendancesheets', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      employee_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        },
        unique: "employeeattendancesheets_employee_id_date_start_date_end_key"
      },
      date_start: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        unique: "employeeattendancesheets_employee_id_date_start_date_end_key"
      },
      date_end: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        unique: "employeeattendancesheets_employee_id_date_start_date_end_key"
      },
      status: {
        type: Sequelize.ENUM("Approved", "Pending", "Rejected", "Submitted"),
        allowNull: true,
        defaultValue: "Pending"
      }
    }, {
      Sequelize,
      tableName: 'employeeattendancesheets',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "employeeattendancesheets_date_end",
          fields: [
            { name: "date_end" },
          ]
        },
        {
          name: "employeeattendancesheets_employee_id_date_start_date_end_key",
          unique: true,
          fields: [
            { name: "employee_id" },
            { name: "date_start" },
            { name: "date_end" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'employeeattendancesheets');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeeattendancesheets');
  }
};