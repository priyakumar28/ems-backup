const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('notifications', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fromuser: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    fromemployee: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    touser: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    action: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("Unread", "Read"),
      allowNull: true,
      defaultValue: "Unread"
    },
    employee: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'notifications',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "notifications_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "touser_status_time",
        fields: [
          { name: "touser" },
          { name: "status" },
          { name: "time" },
        ]
      },
      {
        name: "touser_time",
        fields: [
          { name: "touser" },
          { name: "time" },
        ]
      },
    ]
  });
};
