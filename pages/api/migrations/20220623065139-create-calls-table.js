'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('calls', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      job: {

        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'job',
          key: 'id'
        }
      },
      candidate: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'candidates',
          key: 'id'
        }
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: null
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
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'calls',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('calls');
  }
};