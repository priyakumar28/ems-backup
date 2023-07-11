'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('crons', {
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
      class: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      lastrun: {
        type: Sequelize.DATE,
        allowNull: true
      },
      frequency: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      time: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM("Minutely", "Hourly", "Daily", "Weekly", "Monthly", "Yearly"),
        allowNull: true,
        defaultValue: "Hourly"
      },
      status: {
        type: Sequelize.ENUM("Enabled", "Disabled"),
        allowNull: true,
        defaultValue: "Enabled"
      }
    }, {
      Sequelize,
      tableName: 'crons',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "key_crons_frequency",
          fields: [
            { name: "frequency" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'crons');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('crons');
  }
};