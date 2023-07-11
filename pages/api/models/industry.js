const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('industry', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'industry',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "industry_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
