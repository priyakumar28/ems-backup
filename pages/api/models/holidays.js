const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('holidays', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    dateh: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      unique: "holidays_dateh_country_key"
    },
    status: {
      type: DataTypes.ENUM("Full Day","Half Day"),
      allowNull: true,
      defaultValue: "Full Day"
    },
    country: {
      type: DataTypes.BIGINT,
      allowNull: true,
      unique: "holidays_dateh_country_key"
    }
  }, {
    sequelize,
    tableName: 'holidays',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "holidays_dateh_country_key",
        unique: true,
        fields: [
          { name: "dateh" },
          { name: "country" },
        ]
      },
      {
        name: "holidays_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
