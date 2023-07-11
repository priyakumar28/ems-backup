'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payroll', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      pay_period: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      department: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      column_template: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      columns: {
        type: Sequelize.STRING(500),
        allowNull: true,
        defaultValue: null
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
        type: Sequelize.ENUM("Draft", "Completed", "Processing"),
        allowNull: true,
        defaultValue: "Draft"
      },
      paysliptemplate: {
        type: Sequelize.BIGINT,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'payroll',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payroll');
  }
};