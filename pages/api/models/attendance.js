const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('attendance', {
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
    in_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    out_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    note: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    tableName: 'attendance',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "attendance_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "employee_in_time",
        fields: [
          { name: "employee" },
          { name: "in_time" },
        ]
      },
      {
        name: "employee_out_time",
        fields: [
          { name: "employee" },
          { name: "out_time" },
        ]
      },
      {
        name: "in_time",
        fields: [
          { name: "in_time" },
        ]
      },
      {
        name: "out_time",
        fields: [
          { name: "out_time" },
        ]
      },
    ]
  });
};
