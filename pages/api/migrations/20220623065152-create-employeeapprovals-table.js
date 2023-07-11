'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeeapprovals', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: "employeeapprovals_type_element_level_key"
      },
      element: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: "employeeapprovals_type_element_level_key"
      },
      approver: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
        unique: "employeeapprovals_type_element_level_key"
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      active: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
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
      tableName: 'employeeapprovals',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "employeeapprovals_type",
          fields: [
            { name: "type" },
          ]
        },
        {
          name: "employeeapprovals_type_element",
          fields: [
            { name: "type" },
            { name: "element" },
          ]
        },
        {
          name: "employeeapprovals_type_element_level_key",
          unique: true,
          fields: [
            { name: "type" },
            { name: "element" },
            { name: "level" },
          ]
        },
        {
          name: "employeeapprovals_type_element_status_level",
          fields: [
            { name: "type" },
            { name: "element" },
            { name: "status" },
            { name: "level" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'employeeapprovals');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeeapprovals');
  }
};