const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employeetimeentry",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      project: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "projects",
          key: "id",
        },
      },
      employee: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "employees",
          key: "id",
        },
      },
      timesheet: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "employeetimesheets",
          key: "id",
        },
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      date_start: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      time_start: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      date_end: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      time_end: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Active", "Inactive"),
        allowNull: true,
        defaultValue: "Active",
      },
    },
    {
      sequelize,
      tableName: "employeetimeentry",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "employee_project",
          fields: [{ name: "employee" }, { name: "project" }],
        },
        {
          name: "employee_project_date_start",
          fields: [
            { name: "employee" },
            { name: "project" },
            { name: "date_start" },
          ],
        },
        {
          name: "employeetimeentry_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
