'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeeleavelog', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      employee_leave: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'employeeleaves',
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      data: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      status_from: {
        type: Sequelize.ENUM("Approved", "Pending", "Rejected", "Cancellation Requested", "Cancelled", "Processing"),
        allowNull: true,
        defaultValue: "Pending"
      },
      status_to: {
        type: Sequelize.ENUM("Approved", "Pending", "Rejected", "Cancellation Requested", "Cancelled", "Processing"),
        allowNull: true,
        defaultValue: "Pending"
      },
      created: {
        type: Sequelize.DATE,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'employeeleavelog',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeeleavelog');
  }
};