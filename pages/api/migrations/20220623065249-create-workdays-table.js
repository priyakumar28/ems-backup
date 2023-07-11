'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('workdays', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: "workdays_name_country_key"
      },
      status: {
        type: Sequelize.ENUM("Full Day", "Half Day", "Non-working Day"),
        allowNull: true,
        defaultValue: "Full Day"
      },
      country: {
        type: Sequelize.BIGINT,
        allowNull: true,
        unique: "workdays_name_country_key"
      }
    }, {
      Sequelize,
      tableName: 'workdays',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "workdays_name_country_key",
          unique: true,
          fields: [
            { name: "name" },
            { name: "country" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'workdays');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('workdays');
  }
};