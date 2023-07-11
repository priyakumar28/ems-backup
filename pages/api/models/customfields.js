const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customfields', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "customfields_type_name_key"
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "customfields_type_name_key"
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    display: {
      type: DataTypes.ENUM("Form","Table and Form","Hidden"),
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
    },
    field_type: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    field_label: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    field_validation: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    field_options: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    display_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    display_section: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'customfields',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "customfields_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "customfields_type_name_key",
        unique: true,
        fields: [
          { name: "type" },
          { name: "name" },
        ]
      },
    ]
  });
};
