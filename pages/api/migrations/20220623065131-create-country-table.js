'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('country', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      code: {
        type: Sequelize.CHAR(2),
        allowNull: false,
        unique: "country_code_key"
      },
      namecap: {
        type: Sequelize.STRING(80),
        allowNull: true,
        defaultValue: ""
      },
      name: {
        type: Sequelize.STRING(80),
        allowNull: false,
        defaultValue: ""
      },
      iso3: {
        type: Sequelize.CHAR(10),
        allowNull: true
      },
      numcode: {
        type: Sequelize.SMALLINT,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'country',
      schema: 'public',
      timestamps: false,
    });

    let indexes = [
      {
        name: "country_code_key",
        unique: true,
        fields: [
          { name: "code" },
        ]
      }
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'country');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('country');
  }
};