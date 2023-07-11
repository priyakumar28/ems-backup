const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('documents', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    expire_notification: {
      type: DataTypes.ENUM("Yes", "No"),
      allowNull: true,
      defaultValue: "Yes"
    },
    expire_notification_month: {
      type: DataTypes.ENUM("Yes", "No"),
      allowNull: true,
      defaultValue: "Yes"
    },
    expire_notification_week: {
      type: DataTypes.ENUM("Yes", "No"),
      allowNull: true,
      defaultValue: "Yes"
    },
    expire_notification_day: {
      type: DataTypes.ENUM("Yes", "No"),
      allowNull: true,
      defaultValue: "Yes"
    },
    sign: {
      type: DataTypes.ENUM("Yes", "No"),
      allowNull: true,
      defaultValue: "Yes"
    },
    sign_label: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    // approvalstatus: {
    //   type: DataTypes.ENUM("pending", "approved", "rejected"),
    //   allowNull: true,
    //   defaultValue: "pending"
    // },
  },{
    sequelize,
    tableName: 'documents',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "documents_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
