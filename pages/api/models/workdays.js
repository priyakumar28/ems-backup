const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('workdays', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "workdays_name_country_key"
    },
    status: {
      type: DataTypes.ENUM("Full Day","Half Day","Non-working Day"),
      allowNull: true,
      defaultValue: "Full Day"
    },
    country: {
      type: DataTypes.BIGINT,
      allowNull: true,
      unique: "workdays_name_country_key"
    }
  }, {
    sequelize,
    tableName: 'workdays',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "workdays_name_country_key",
        unique: true,
        fields: [
          { name: "name" },
          { name: "country" },
        ]
      },
      {
        name: "workdays_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
