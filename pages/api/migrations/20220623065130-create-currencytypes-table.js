'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('currencytypes', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      code: {
        type: Sequelize.STRING(3),
        allowNull: false,
        defaultValue: "",
        unique: "currencytypes_code_key"
      },
      name: {
        type: Sequelize.STRING(70),
        allowNull: false,
        defaultValue: ""
      }
    }, {
      Sequelize,
      tableName: 'currencytypes',
      schema: 'public',
      timestamps: false
    });

    let indexes = [
      {
          name: "currencytypes_code_key",
          unique: true,
          fields: [
            { name: "code" },
          ]
        }
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'currencytypes');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('currencytypes');
  }
};