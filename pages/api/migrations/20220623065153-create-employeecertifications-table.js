'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeecertifications', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      certification_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'certifications',
          key: 'id'
        },
        unique: "employeecertifications_employee_certification_id_key"
      },
      certification_name: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      employee: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        },
        unique: "employeecertifications_employee_certification_id_key"
      },
      institute: {
        type: Sequelize.STRING(400),
        allowNull: true,
        defaultValue: null
      },
      date_start: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      date_end: {
        type: Sequelize.DATEONLY,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'employeecertifications',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "employeecertifications_employee_certification_id_key",
          unique: true,
          fields: [
            { name: "employee" },
            { name: "certification_id" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'employeecertifications');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeecertifications');
  }
};