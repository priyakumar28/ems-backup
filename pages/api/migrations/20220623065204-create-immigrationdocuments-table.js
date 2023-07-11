'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('immigrationdocuments', {
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
      required: {
        type: Sequelize.ENUM("Yes", "No"),
        allowNull: true,
        defaultValue: "Yes"
      },
      alert_on_missing: {
        type: Sequelize.ENUM("Yes", "No"),
        allowNull: true,
        defaultValue: "Yes"
      },
      alert_before_expiry: {
        type: Sequelize.ENUM("Yes", "No"),
        allowNull: true,
        defaultValue: "Yes"
      },
      alert_before_day_number: {
        type: Sequelize.INTEGER,
        allowNull: false
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
      tableName: 'immigrationdocuments',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('immigrationdocuments');
  }
};