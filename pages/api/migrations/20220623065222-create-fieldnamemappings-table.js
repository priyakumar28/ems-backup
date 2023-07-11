'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fieldnamemappings', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: "fieldnamemappings_name_key"
      },
      textorig: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: null
      },
      textmapped: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: null
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
      }
    }, {
      Sequelize,
      tableName: 'fieldnamemappings',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "fieldnamemappings_name_key",
          unique: true,
          fields: [
            { name: "name" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'fieldnamemappings');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('fieldnamemappings');
  }
};