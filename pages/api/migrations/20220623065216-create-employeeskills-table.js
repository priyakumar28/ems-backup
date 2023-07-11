'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeeskills', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      skill_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'skills',
          key: 'id'
        },
        unique: "employeeskills_employee_skill_id_key"
      },
      skill_name: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      is_certified: {
        type: Sequelize.Sequelize.ENUM("Yes", "No"),
        allowNull: false,
        defaultValue: "No",
      },
      attachment: {
        type: Sequelize.Sequelize.TEXT,
        allowNull: true,
      },
      employee: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        },
        unique: "employeeskills_employee_skill_id_key"
      },
      date_start: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      date_end: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      details: {
        type: Sequelize.STRING(400),
        allowNull: true,
        defaultValue: null
      }
    }, {
      Sequelize,
      tableName: 'employeeskills',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "employeeskills_employee_skill_id_key",
          unique: true,
          fields: [
            { name: "employee" },
            { name: "skill_id" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'employeeskills');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeeskills');
  }
};