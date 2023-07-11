const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('country', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.CHAR(2),
      allowNull: false,      
      unique: "country_code_key"
    },
    namecap: {
      type: DataTypes.STRING(80),
      allowNull: true,
      defaultValue: ""
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
      defaultValue: ""
    },
    iso3: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    numcode: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'country',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "country_code_key",
        unique: true,
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "country_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
