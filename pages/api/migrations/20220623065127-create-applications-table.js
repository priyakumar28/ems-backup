'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('applications', {
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
        },
        unique: "applications_job_candidate_key"
      },
      candidate: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'candidates',
          key: 'id'
        },
        unique: "applications_job_candidate_key"
      },
      created: {
        type: Sequelize.DATE,
        allowNull: true
      },
      referredbyemail: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: null
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'applications',
      schema: 'public',
      timestamps: false
    });

    let indexes = [
      {
        name: "applications_job_candidate_key",
        unique: true,
        fields: [
          { name: "job" },
          { name: "candidate" },
        ]
      }
    ];

    await migrationsAddIndexes(indexes, queryInterface, 'applications');

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('applications');
  }
};