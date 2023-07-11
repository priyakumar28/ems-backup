const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employeetrainingsessions",
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
      },
      trainingsession: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "trainingsessions",
          key: "id",
        },
      },
      feedback: {
        type: DataTypes.STRING(1500),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          "Scheduled",
          "Attended",
          "Not-Attended",
          "Completed"
        ),
        allowNull: true,
        defaultValue: "Scheduled",
      },
      proof: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "employeetrainingsessions",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "employeetrainingsessions_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
