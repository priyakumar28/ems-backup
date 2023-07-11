'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeecompanyloans', {
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
        }
      },
      loan: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'companyloans',
          key: 'id'
        }
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      last_installment_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      period_months: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      currency: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      monthly_installment: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM("Approved", "Repayment", "Paid", "Suspended"),
        allowNull: true,
        defaultValue: "Approved"
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'employeecompanyloans',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeecompanyloans');
  }
};