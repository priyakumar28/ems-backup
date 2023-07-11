'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('companystructures', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      type: {
        type: Sequelize.ENUM("Company", "Head Office", "Regional Office", "Department", "Unit", "Sub Unit", "Other"),
        allowNull: true
      },
      country: {
        type: Sequelize.STRING(3),
        allowNull: false,
        defaultValue: "0"
      },
      parent: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'companystructures',
          key: 'id'
        }
      },
      timezone: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: "Europe\/London"
      },
      heads: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null
      }
    }, {
      Sequelize,
      tableName: 'companystructures',
      schema: 'public',
      timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('companystructures');
  }
};