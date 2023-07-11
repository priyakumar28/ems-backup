const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "bankdetails",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      account_type: {
        type: DataTypes.ENUM("Personal", "Salaried"),
        allowNull: false,
        defaultValue: "Personal"
      },
      bank_name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      branch: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      account_number: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      ifsc: {
        type: DataTypes.STRING(16),
        allowNull: false,
      },
      emp_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "employees",
          key: "id",
        },
      },
      createdBy: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "employees",
          key: "id",
        },
      },
      attachment:{
        type: DataTypes.TEXT,
        allowNull:false
      },
      status:{
        type: Sequelize.DataTypes.ENUM("Pending", "Approved", "Rejected"),
        allowNull: false,
        defaultValue: "Pending",
      },
      reason_for_rejection: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "bankdetails",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "bankdetails_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
