'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('department', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: "department_name_key"
      },
      code: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: "department_code_key"
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
    }, {
      Sequelize,
      tableName: 'department',
      schema: 'public',
      timestamps: false
    });

    let indexes = [
      {
        name: "department_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "department_code_key",
        unique: true,
        fields: [
          { name: "code" },
        ]
      }
    ];

    await migrationsAddIndexes(indexes, queryInterface, 'department');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('department');
  }
};