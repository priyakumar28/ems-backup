'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeetravelrecords', {
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
      type: {
        type: Sequelize.ENUM("Local", "International"),
        allowNull: true,
        defaultValue: "Local"
      },
      purpose: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      travel_from: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      travel_to: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      travel_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      return_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      details: {
        type: Sequelize.STRING(500),
        allowNull: true,
        defaultValue: null
      },
      funding: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      currency: {
        type: Sequelize.BIGINT,
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
      },
      status: {
        type: Sequelize.ENUM("Approved", "Pending", "Rejected", "Cancellation Requested", "Cancelled", "Processing"),
        allowNull: true,
        defaultValue: "Pending"
      }
    }, {
      Sequelize,
      tableName: 'employeetravelrecords',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeetravelrecords');
  }
};