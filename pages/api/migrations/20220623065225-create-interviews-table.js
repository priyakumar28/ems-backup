'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('interviews', {
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
      level: {
        type: Sequelize.STRING(100),
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
      scheduled: {
        type: Sequelize.DATE,
        allowNull: true
      },
      location: {
        type: Sequelize.STRING(500),
        allowNull: true,
        defaultValue: null
      },
      mapid: {
        type: Sequelize.BIGINT,
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
      tableName: 'interviews',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('interviews');
  }
};