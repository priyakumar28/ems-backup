'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      code: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      coordinator: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      trainer: {
        type: Sequelize.STRING(300),
        allowNull: true
      },
      trainer_info: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      paymenttype: {
        type: Sequelize.ENUM("Company Sponsored", "Paid by Employee"),
        allowNull: true,
        defaultValue: "Company Sponsored"
      },
      currency: {
        type: Sequelize.STRING(3),
        allowNull: true
      },
      cost: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        defaultValue: 0.00
      },
      status: {
        type: Sequelize.ENUM("Active", "Inactive"),
        allowNull: true,
        defaultValue: "Active"
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
      tableName: 'courses',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('courses');
  }
};