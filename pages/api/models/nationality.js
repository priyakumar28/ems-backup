const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('nationality', {
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
    }
  }, {
    sequelize,
    tableName: 'nationality',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "nationality_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
