const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeeethnicity', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    employee: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    ethnicity: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'ethnicity',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'employeeethnicity',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employeeethnicity_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
