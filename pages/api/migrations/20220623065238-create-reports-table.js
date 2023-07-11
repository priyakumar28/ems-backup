'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reports', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: "reports_name_key"
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      parameters: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      query: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      paramorder: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM("Query", "Class"),
        allowNull: true,
        defaultValue: "Query"
      },
      report_group: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      output: {
        type: Sequelize.STRING(15),
        allowNull: false,
        defaultValue: "CSV"
      }
    }, {
      Sequelize,
      tableName: 'reports',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "reports_name_key",
          unique: true,
          fields: [
            { name: "name" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'reports');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reports');
  }
};