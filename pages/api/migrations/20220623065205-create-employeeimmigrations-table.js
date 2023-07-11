'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeeimmigrations', {
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
      document: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'immigrationdocuments',
          key: 'id'
        }
      },
      documentname: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      valid_until: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM("Active", "Inactive", "Draft"),
        allowNull: true,
        defaultValue: "Active"
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      attachment1: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      attachment2: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      attachment3: {
        type: Sequelize.STRING(100),
        allowNull: true
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
      tableName: 'employeeimmigrations',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeeimmigrations');
  }
};