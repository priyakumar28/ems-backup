const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('currencytypes', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: "",
      unique: "currencytypes_code_key"
    },
    name: {
      type: DataTypes.STRING(70),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'currencytypes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "currencytypes_code_key",
        unique: true,
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "currencytypes_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
