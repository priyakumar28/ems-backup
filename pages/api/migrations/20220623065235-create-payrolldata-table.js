'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payrolldata', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      payroll: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'payroll',
          key: 'id'
        },
        unique: "payrolldata_payroll_employee_payroll_item_key"
      },
      employee: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: "payrolldata_payroll_employee_payroll_item_key"
      },
      payroll_item: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: "payrolldata_payroll_employee_payroll_item_key"
      },
      amount: {
        type: Sequelize.STRING(25),
        allowNull: true,
        defaultValue: null
      }
    }, {
      Sequelize,
      tableName: 'payrolldata',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
      {
        name: "payrolldata_payroll_employee_payroll_item_key",
        unique: true,
        fields: [
          { name: "payroll" },
          { name: "employee" },
          { name: "payroll_item" },
        ]
      },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'payrolldata');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payrolldata');
  }
};