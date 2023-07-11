'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payrollcolumns', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null
      },
      calculation_hook: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: null
      },
      salary_components: {
        type: Sequelize.STRING(500),
        allowNull: true,
        defaultValue: null
      },
      deductions: {
        type: Sequelize.STRING(500),
        allowNull: true,
        defaultValue: null
      },
      add_columns: {
        type: Sequelize.STRING(500),
        allowNull: true,
        defaultValue: null
      },
      sub_columns: {
        type: Sequelize.STRING(500),
        allowNull: true,
        defaultValue: null
      },
      colorder: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      editable: {
        type: Sequelize.ENUM("Yes", "No"),
        allowNull: true,
        defaultValue: "Yes"
      },
      enabled: {
        type: Sequelize.ENUM("Yes", "No"),
        allowNull: true,
        defaultValue: "Yes"
      },
      default_value: {
        type: Sequelize.STRING(25),
        allowNull: true,
        defaultValue: null
      },
      calculation_columns: {
        type: Sequelize.STRING(500),
        allowNull: true,
        defaultValue: null
      },
      calculation_function: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null
      }
    }, {
      Sequelize,
      tableName: 'payrollcolumns',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payrollcolumns');
  }
};