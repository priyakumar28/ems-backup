'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clients', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      first_contact_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      created: {
        type: Sequelize.DATE,
        allowNull: true
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      contact_number: {
        type: Sequelize.STRING(25),
        allowNull: true
      },
      contact_email: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      company_url: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM("Active", "Inactive"),
        allowNull: true,
        defaultValue: "Active"
      }
    }, {
      Sequelize,
      tableName: 'clients',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};