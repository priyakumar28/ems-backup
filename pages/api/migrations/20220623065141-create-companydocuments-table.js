'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('companydocuments', {
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
      valid_until: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM("Active", "Inactive", "Draft"),
        allowNull: true,
        defaultValue: "Active"
      },
      notify_employees: {
        type: Sequelize.ENUM("Yes", "No"),
        allowNull: true,
        defaultValue: "Yes"
      },
      attachment: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      share_departments: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      share_employees: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      share_userlevel: {
        type: Sequelize.STRING(100),
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'companydocuments',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('companydocuments');
  }
};