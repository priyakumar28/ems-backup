const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('leavetypes', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "leavetypes_name_key"
    },
    supervisor_leave_assign: {
      type: DataTypes.ENUM("Yes","No"),
      allowNull: true,
      defaultValue: "Yes"
    },
    employee_can_apply: {
      type: DataTypes.ENUM("Yes","No"),
      allowNull: true,
      defaultValue: "Yes"
    },
    apply_beyond_current: {
      type: DataTypes.ENUM("Yes","No"),
      allowNull: true,
      defaultValue: "Yes"
    },
    leave_accrue: {
      type: DataTypes.ENUM("Yes","No"),
      allowNull: true,
      defaultValue: "No"
    },
    carried_forward: {
      type: DataTypes.ENUM("Yes","No"),
      allowNull: true,
      defaultValue: "No"
    },
    default_per_year: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    carried_forward_percentage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    carried_forward_leave_availability: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 365
    },
    propotionate_on_joined_date: {
      type: DataTypes.ENUM("Yes","No"),
      allowNull: true,
      defaultValue: "No"
    },
    send_notification_emails: {
      type: DataTypes.ENUM("Yes","No"),
      allowNull: true,
      defaultValue: "Yes"
    },
    leave_group: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    leave_color: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    max_carried_forward_amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'leavetypes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "leavetypes_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "leavetypes_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
