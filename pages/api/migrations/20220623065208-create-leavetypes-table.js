'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leavetypes', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: "leavetypes_name_key"
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
      send_notification_emails: {
        type: Sequelize.ENUM("Yes", "No"),
        allowNull: true,
        defaultValue: "Yes"
      },
      leave_group: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      leave_color: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      max_carried_forward_amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      }
    }, {
      Sequelize,
      tableName: 'leavetypes',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "leavetypes_name_key",
          unique: true,
          fields: [
            { name: "name" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'leavetypes');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('leavetypes');
  }
};