'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeeemploymenthistory', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      employer_name: {
        type: Sequelize.STRING(400),
        allowNull: false,
        defaultValue: null,
      },
      employee: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "employees",
          key: "id",
        },
        unique: "employeeemploymenthistory_employee_employer_name_key",
      },
      date_start: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      date_end: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      job_title: {
        type: Sequelize.STRING(400),
        allowNull: true,
        defaultValue: null,
      },
      employment_type: {
        type: Sequelize.STRING(400),
        allowNull: true,
        defaultValue: null,
      },
      payroll_type: {
        type: Sequelize.STRING(400),
        allowNull: true,
        defaultValue: null,
      },
      payroll_amount: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        defaultValue: 0.0,
      },
      reason_for_leaving: {
        type: Sequelize.STRING(400),
        allowNull: true,
        defaultValue: null,
      },
      reference_name: {
        type: Sequelize.STRING(400),
        allowNull: true,
        defaultValue: null,
      },
      reference_phno: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
    },
      {
        Sequelize,
        tableName: "employeeemploymenthistory",
        schema: "public",
        timestamps: false,
      });

    let indexes = [
        {
            name: "employeeemploymenthistory_employee_employer_name_key",
            unique: true,
            fields: [{ name: "employee" }, { name: "employer_name" }],
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'employeeemploymenthistory');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeeemploymenthistory');
  }
};