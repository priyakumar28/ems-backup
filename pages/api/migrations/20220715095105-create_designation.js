'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('designation', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      code: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: "designation_code_key"
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: "designation_name_key"
      },
      department: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'department',
          key: 'id'
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
    }, {
      Sequelize,
      tableName: 'designation',
      schema: 'public',
      timestamps: false
    });

    let indexes = [
      {
        name: "designation_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "designation_code_key",
        unique: true,
        fields: [
          { name: "code" },
        ]
      }
    ];

    await migrationsAddIndexes(indexes, queryInterface, 'designation');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('designation');
  }
};