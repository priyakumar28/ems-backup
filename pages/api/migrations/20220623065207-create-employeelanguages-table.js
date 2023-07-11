'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeelanguages', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      language_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'languages',
          key: 'id'
        },
        unique: "employeelanguages_employee_language_id_key"
      },
      employee: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        },
        unique: "employeelanguages_employee_language_id_key"
      },
      reading: {
        type: Sequelize.ENUM("Elementary Proficiency", "Limited Working Proficiency", "Professional Working Proficiency", "Full Professional Proficiency", "Native or Bilingual Proficiency"),
        allowNull: true
      },
      speaking: {
        type: Sequelize.ENUM("Elementary Proficiency", "Limited Working Proficiency", "Professional Working Proficiency", "Full Professional Proficiency", "Native or Bilingual Proficiency"),
        allowNull: true
      },
      writing: {
        type: Sequelize.ENUM("Elementary Proficiency", "Limited Working Proficiency", "Professional Working Proficiency", "Full Professional Proficiency", "Native or Bilingual Proficiency"),
        allowNull: true
      },
      understanding: {
        type: Sequelize.ENUM("Elementary Proficiency", "Limited Working Proficiency", "Professional Working Proficiency", "Full Professional Proficiency", "Native or Bilingual Proficiency"),
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'employeelanguages',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "employeelanguages_employee_language_id_key",
          unique: true,
          fields: [
            { name: "employee" },
            { name: "language_id" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'employeelanguages');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeelanguages');
  }
};