'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeeexpenses', {
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
      expense_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      payment_method: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'expensespaymentmethods',
          key: 'id'
        }
      },
      transaction_no: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      payee: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      category: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'expensescategories',
          key: 'id'
        }
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      currency: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      attachment1: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      attachment2: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      attachment3: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      created: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM("Approved", "Pending", "Rejected", "Cancellation Requested", "Cancelled", "Processing"),
        allowNull: true,
        defaultValue: "Pending"
      }
    }, {
      Sequelize,
      tableName: 'employeeexpenses',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeeexpenses');
  }
};