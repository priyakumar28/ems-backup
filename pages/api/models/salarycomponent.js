const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('salarycomponent', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    componenttype: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'salarycomponenttype',
        key: 'id'
      }
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'salarycomponent',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "salarycomponent_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
