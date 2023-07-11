'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reportfiles', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      employee: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      attachment: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: "reportfiles_attachment_key"
      },
      created: {
        type: Sequelize.DATE,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'reportfiles',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
      {
        name: "reportfiles_attachment_key",
        unique: true,
        fields: [
          { name: "attachment" },
        ]
      },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'reportfiles');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reportfiles');
  }
};