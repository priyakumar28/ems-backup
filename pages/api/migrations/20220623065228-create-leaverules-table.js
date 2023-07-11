'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leaverules', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      leave_type: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      job_title: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      employment_status: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      employee: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      supervisor_leave_assign: {
        type: Sequelize.ENUM("Yes", "No"),
        allowNull: true,
        defaultValue: "Yes"
      },
      employee_can_apply: {
        type: Sequelize.ENUM("Yes", "No"),
        allowNull: true,
        defaultValue: "Yes"
      },
      apply_beyond_current: {
        type: Sequelize.ENUM("Yes", "No"),
        allowNull: true,
        defaultValue: "Yes"
      },
      leave_accrue: {
        type: Sequelize.ENUM("Yes", "No"),
        allowNull: true,
        defaultValue: "No"
      },
      carried_forward: {
        type: Sequelize.ENUM("Yes", "No"),
        allowNull: true,
        defaultValue: "No"
      },
      default_per_year: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      carried_forward_percentage: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      carried_forward_leave_availability: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 365
      },
      propotionate_on_joined_date: {
        type: Sequelize.ENUM("Yes", "No"),
        allowNull: true,
        defaultValue: "No"
      },
      leave_group: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      max_carried_forward_amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      }
    }, {
      Sequelize,
      tableName: 'leaverules',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('leaverules');
  }
};