'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customfields', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: "customfields_type_name_key"
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: "customfields_type_name_key"
      },
      data: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      display: {
        type: Sequelize.ENUM("Form", "Table and Form", "Hidden"),
        allowNull: true,
        defaultValue: "Form"
      },
      created: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: true
      },
      field_type: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      field_label: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      field_validation: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      field_options: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      display_section: {
        type: Sequelize.STRING(50),
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'customfields',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "customfields_type_name_key",
          unique: true,
          fields: [
            { name: "type" },
            { name: "name" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'customfields');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customfields');
  }
};