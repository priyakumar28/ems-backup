'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('statuschangelogs', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      element: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      data: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      status_from: {
        type: Sequelize.ENUM("Approved", "Pending", "Rejected", "Cancellation Requested", "Cancelled", "Processing"),
        allowNull: true,
        defaultValue: "Pending"
      },
      status_to: {
        type: Sequelize.ENUM("Approved", "Pending", "Rejected", "Cancellation Requested", "Cancelled", "Processing"),
        allowNull: true,
        defaultValue: "Pending"
      },
      created: {
        type: Sequelize.DATE,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'statuschangelogs',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('statuschangelogs');
  }
};