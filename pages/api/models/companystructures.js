const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('companystructures', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM("Company", "Head Office", "Regional Office", "Department", "Unit", "Sub Unit", "Other"),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: "0"
    },
    parent: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'companystructures',
        key: 'id'
      }
    },
    timezone: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "Europe\/London"
    },
    heads: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    tableName: 'companystructures',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "companystructures_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
