'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customfieldvalues', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: "customfieldvalues_type_name_object_id_key"
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: "customfieldvalues_type_name_object_id_key"
      },
      object_id: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: "customfieldvalues_type_name_object_id_key"
      },
      value: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created: {
        type: Sequelize.DATE,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'customfieldvalues',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "customfields_type_object_id",
          fields: [
            { name: "type" },
            { name: "object_id" },
          ]
        },
        {
          name: "customfieldvalues_type_name_object_id_key",
          unique: true,
          fields: [
            { name: "type" },
            { name: "name" },
            { name: "object_id" },
          ]
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'customfieldvalues');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customfieldvalues');
  }
};