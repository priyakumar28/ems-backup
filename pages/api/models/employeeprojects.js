const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('employeeprojects', {
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
      unique: "employeeprojects_employee_project_key"
    },
    project: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'projects',
        key: 'id'
      },
      unique: "employeeprojects_employee_project_key"
    },
    date_start: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    date_end: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("Current", "Inactive", "Completed"),
      allowNull: true,
      defaultValue: "Current"
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bill_type: {
      type: DataTypes.ENUM("Billable", "Non Billable"),
      allowNull: true
    },
    bill_percent: {
      type: DataTypes.DECIMAL(100),
      allowNull: true
    },
    comments: {
      type: DataTypes.TEXT(250),
      allowNull: true
    }

  }, {
    sequelize,
    tableName: 'employeeprojects',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employeeprojects_employee_project_key",
        unique: true,
        fields: [
          { name: "employee" },
          { name: "project" },
        ]
      },
      {
        name: "employeeprojects_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

//////////.hhhh