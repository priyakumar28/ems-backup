'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bankdetails', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      bank_name: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      branch: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      account_number: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      ifsc: {
        type: Sequelize.STRING(16),
        allowNull: false,
      },
      emp_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "employees",
          key: "id",
        },
      },
      createdBy: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "employees",
          key: "id",
        },
      },
      attachment: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status: {
        type: Sequelize.Sequelize.ENUM("Pending", "Approved", "Rejected"),
        allowNull: false,
        defaultValue: "Pending",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
      {
        Sequelize,
        tableName: "bankdetails",
        schema: "public",
        timestamps: false
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bankdetails');
  }
};