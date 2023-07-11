const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeeimmigrationstatus', {
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
    status: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'immigrationstatus',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'employeeimmigrationstatus',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employeeimmigrationstatus_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
