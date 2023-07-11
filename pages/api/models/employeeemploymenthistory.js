const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employeeemploymenthistory",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      employer_name: {
        type: DataTypes.STRING(400),
        allowNull: false,
        defaultValue: null,
      },
      employee: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "employees",
          key: "id",
        },
        unique: "employeeemploymenthistory_employee_employer_name_key",
      },
      date_start: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      date_end: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      job_title: {
        type: DataTypes.STRING(400),
        allowNull: true,
        defaultValue: null,
      },
      employment_type: {
        type: DataTypes.STRING(400),
        allowNull: true,
        defaultValue: null,
      },
      payroll_type: {
        type: DataTypes.STRING(400),
        allowNull: true,
        defaultValue: null,
      },
      payroll_amount: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: 0.0,
      },
      reason_for_leaving: {
        type: DataTypes.STRING(400),
        allowNull: true,
        defaultValue: null,
      },
      reference_name: {
        type: DataTypes.STRING(400),
        allowNull: true,
        defaultValue: null,
      },
      reference_phno: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      tableName: "employeeemploymenthistory",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "employeeemploymenthistory_employee_employer_name_key",
          unique: true,
          fields: [{ name: "employee" }, { name: "employer_name" }],
        },
        {
          name: "employeeemploymenthistory_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
