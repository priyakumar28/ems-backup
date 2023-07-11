const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employeedocuments",
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
      document: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "documents",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      date_added: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      valid_until: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Active", "Inactive", "Draft"),
        allowNull: true,
        defaultValue: "Active",
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      attachment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      signature: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      expire_notification_last: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      approvalstatus: {
        type: DataTypes.ENUM("Approved", "Pending", "Rejected"),
        allowNull: true,
        defaultValue: "Pending",
      }
    },
    {
      sequelize,
      tableName: "employeedocuments",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "employeedocuments_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
        {
          name: "key_employeedocuments_valid_until",
          fields: [{ name: "valid_until" }],
        },
        {
          name: "key_employeedocuments_valid_until_status",
          fields: [
            { name: "valid_until" },
            { name: "status" },
            { name: "expire_notification_last" },
          ],
        },
      ],
    }
  );
};
