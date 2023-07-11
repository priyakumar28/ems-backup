const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payfrequency', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'payfrequency',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "payfrequency_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
