const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('supportedlanguages', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    tableName: 'supportedlanguages',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "supportedlanguages_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
