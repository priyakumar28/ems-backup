const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('userroles', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "userroles_name_key"
    }
  }, {
    sequelize,
    tableName: 'userroles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "userroles_name_key",
        unique: true,
        fields: [
          { name: "name" },``
        ]
      },
      {
        name: "userroles_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
