'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payrollemployees', {
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
        unique: "payrollemployees_employee_key"
      },
      pay_frequency: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      currency: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      deduction_exemptions: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null
      },
      deduction_allowed: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null
      },
      deduction_group: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'deductiongroup',
          key: 'id'
        }
      }
    }, {
      Sequelize,
      tableName: 'payrollemployees',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "payrollemployees_employee_key",
          unique: true,
          fields: [
            { name: "employee" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'payrollemployees');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payrollemployees');
  }
};