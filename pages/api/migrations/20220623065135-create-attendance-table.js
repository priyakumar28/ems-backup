'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attendance', {
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
      in_time: {
        type: Sequelize.DATE,
        allowNull: true
      },
      out_time: {
        type: Sequelize.DATE,
        allowNull: true
      },
      note: {
        type: Sequelize.STRING(500),
        allowNull: true,
        defaultValue: null
      }
    }, {
      Sequelize,
      tableName: 'attendance',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "employee_in_time",
          fields: [
            { name: "employee" },
            { name: "in_time" },
          ]
        },
        {
          name: "employee_out_time",
          fields: [
            { name: "employee" },
            { name: "out_time" },
          ]
        },
        {
          name: "in_time",
          fields: [
            { name: "in_time" },
          ]
        },
        {
          name: "out_time",
          fields: [
            { name: "out_time" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'attendance');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('attendance');
  }
};