'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('restaccesstokens', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      userid: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: "restaccesstokens_userid_key"
      },
      hash: {
        type: Sequelize.STRING(32),
        allowNull: true,
        defaultValue: null
      },
      token: {
        type: Sequelize.STRING(500),
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
      }
    }, {
      Sequelize,
      tableName: 'restaccesstokens',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "restaccesstokens_userid_key",
          unique: true,
          fields: [
            { name: "userid" },
          ]
        },
    ];
    await migrationsAddIndexes(indexes, queryInterface, 'restaccesstokens');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('restaccesstokens');
  }
};