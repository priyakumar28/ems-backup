'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userroles', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: "userroles_name_key"
      }
    }, {
      Sequelize,
      tableName: 'userroles',
      schema: 'public',
      timestamps: false,
    });

    let indexes = [
      {
        name: "userroles_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      }
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'userroles');

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('userroles');
  }
};