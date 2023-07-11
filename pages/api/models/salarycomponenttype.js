const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('salarycomponenttype', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'salarycomponenttype',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "salarycomponenttype_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
