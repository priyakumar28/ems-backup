'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeesalary', {
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
      component: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      pay_frequency: {
        type: Sequelize.ENUM("Hourly", "Daily", "Bi Weekly", "Weekly", "Semi Monthly", "Monthly"),
        allowNull: true
      },
      currency: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'currencytypes',
          key: 'id'
        }
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'employeesalary',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeesalary');
  }
};