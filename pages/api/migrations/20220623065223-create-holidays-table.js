'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('holidays', {
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
      dateh: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        unique: "holidays_dateh_country_key"
      },
      status: {
        type: Sequelize.ENUM("Full Day", "Half Day"),
        allowNull: true,
        defaultValue: "Full Day"
      },
      country: {
        type: Sequelize.BIGINT,
        allowNull: true,
        unique: "holidays_dateh_country_key"
      }
    }, {
      Sequelize,
      tableName: 'holidays',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
      {
        name: "holidays_dateh_country_key",
        unique: true,
        fields: [
          { name: "dateh" },
          { name: "country" },
        ]
      },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'holidays');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('holidays');
  }
};