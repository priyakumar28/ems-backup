const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ethnicity', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ethnicity',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ethnicity_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
