const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeeleaves', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    employee: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    leave_type: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'leavetypes',
        key: 'id'
      }
    },
    leave_period: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'leaveperiods',
        key: 'id'
      }
    },
    date_start: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    date_end: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("Approved","Pending","Rejected","Cancellation Requested","Cancelled","Processing"),
      allowNull: true,
      defaultValue: "Pending"
    },
    attachment: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employeeleaves',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employeeleaves_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
