const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('payrolldata', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    payroll: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'payroll',
        key: 'id'
      },
      unique: "payrolldata_payroll_employee_payroll_item_key"
    },
    employee: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: "payrolldata_payroll_employee_payroll_item_key"
    },
    payroll_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "payrolldata_payroll_employee_payroll_item_key"
    },
    amount: {
      type: DataTypes.STRING(25),
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    tableName: 'payrolldata',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "payrolldata_payroll_employee_payroll_item_key",
        unique: true,
        fields: [
          { name: "payroll" },
          { name: "employee" },
          { name: "payroll_item" },
        ]
      },
      {
        name: "payrolldata_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
