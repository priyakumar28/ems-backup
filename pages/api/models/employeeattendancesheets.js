const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeeattendancesheets', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    employee_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id'
      },
      unique: "employeeattendancesheets_employee_id_date_start_date_end_key"
    },
    date_start: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: "employeeattendancesheets_employee_id_date_start_date_end_key"
    },
    date_end: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: "employeeattendancesheets_employee_id_date_start_date_end_key"
    },
    status: {
      type: DataTypes.ENUM("Approved","Pending","Rejected","Submitted"),
      allowNull: true,
      defaultValue: "Pending"
    }
  }, {
    sequelize,
    tableName: 'employeeattendancesheets',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employeeattendancesheets_date_end",
        fields: [
          { name: "date_end" },
        ]
      },
      {
        name: "employeeattendancesheets_employee_id_date_start_date_end_key",
        unique: true,
        fields: [
          { name: "employee_id" },
          { name: "date_start" },
          { name: "date_end" },
        ]
      },
      {
        name: "employeeattendancesheets_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
