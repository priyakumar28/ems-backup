'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeeleaves', {
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
      leave_type: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'leavetypes',
          key: 'id'
        }
      },
      leave_period: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'leaveperiods',
          key: 'id'
        }
      },
      date_start: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      date_end: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM("Approved", "Pending", "Rejected", "Cancellation Requested", "Cancelled", "Processing"),
        allowNull: true,
        defaultValue: "Pending"
      },
      attachment: {
        type: Sequelize.STRING(100),
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'employeeleaves',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeeleaves');
  }
};