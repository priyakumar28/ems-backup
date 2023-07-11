const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employeedatahistory",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      employee_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "employees",
          key: "id",
        },
      },
      field: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      old_value: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: null,
      },
      new_value: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: null,
      },
      description: {
        type: DataTypes.STRING(800),
        allowNull: true,
        defaultValue: null,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      updated: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "employeedatahistory",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "employeedatahistory_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
