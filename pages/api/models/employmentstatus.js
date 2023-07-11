const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('employmentstatus', {
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
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    tableName: 'employmentstatus',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employmentstatus_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
