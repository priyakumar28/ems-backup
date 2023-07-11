'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leavegroupemployees', {
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
        unique: "leavegroupemployees_employee_key"
      },
      leave_group: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'leavegroups',
          key: 'id'
        }
      },
      created: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'leavegroupemployees',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "leavegroupemployees_employee_key",
          unique: true,
          fields: [
            { name: "employee" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'leavegroupemployees');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('leavegroupemployees');
  }
};