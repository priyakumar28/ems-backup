const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('fieldnamemappings', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "fieldnamemappings_name_key"
    },
    textorig: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null
    },
    textmapped: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null
    },
    display: {
      type: DataTypes.ENUM("Form", "Table and Form", "Hidden"),
      allowNull: true,
      defaultValue: "Form"
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'fieldnamemappings',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "fieldnamemappings_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "fieldnamemappings_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
