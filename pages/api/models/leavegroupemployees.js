const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('leavegroupemployees', {
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
      },
      unique: "leavegroupemployees_employee_key"
    },
    leave_group: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'leavegroups',
        key: 'id'
      }
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'leavegroupemployees',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "leavegroupemployees_employee_key",
        unique: true,
        fields: [
          { name: "employee" },
        ]
      },
      {
        name: "leavegroupemployees_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
