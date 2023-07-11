const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employeetimesheets",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      employee: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "employees",
          key: "id",
        },
        unique: "employeetimesheets_employee_date_start_date_end_key",
      },
      date_start: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: "employeetimesheets_employee_date_start_date_end_key",
      },
      date_end: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: "employeetimesheets_employee_date_start_date_end_key",
      },
      status: {
        type: DataTypes.ENUM("Approved", "Pending", "Rejected", "Submitted"),
        allowNull: true,
        defaultValue: "Pending",
      },
      comments: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "employeetimesheets",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "employeetimesheets_date_end",
          fields: [{ name: "date_end" }],
        },
        {
          name: "employeetimesheets_employee_date_start_date_end_key",
          unique: true,
          fields: [
            { name: "employee" },
            { name: "date_start" },
            { name: "date_end" },
          ],
        },
        {
          name: "employeetimesheets_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
