const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customfieldvalues', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "customfieldvalues_type_name_object_id_key"
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: "customfieldvalues_type_name_object_id_key"
    },
    object_id: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: "customfieldvalues_type_name_object_id_key"
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'customfieldvalues',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "customfields_type_object_id",
        fields: [
          { name: "type" },
          { name: "object_id" },
        ]
      },
      {
        name: "customfieldvalues_pkey",
        unique: true,
        fields: [
          { name: "id" },
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
    ]
  });
};
