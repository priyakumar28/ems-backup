const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeeleavelog', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    employee_leave: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'employeeleaves',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    data: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    status_from: {
      type: DataTypes.ENUM("Approved","Pending","Rejected","Cancellation Requested","Cancelled","Processing"),
      allowNull: true,
      defaultValue: "Pending"
    },
    status_to: {
      type: DataTypes.ENUM("Approved","Pending","Rejected","Cancellation Requested","Cancelled","Processing"),
      allowNull: true,
      defaultValue: "Pending"
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employeeleavelog',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employeeleavelog_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
