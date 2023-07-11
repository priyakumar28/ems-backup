const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('payrollemployees', {
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
      },
      unique: "payrollemployees_employee_key"
    },
    pay_frequency: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    currency: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    deduction_exemptions: {
      type: DataTypes.STRING(250),
      allowNull: true,
      defaultValue: null
    },
    deduction_allowed: {
      type: DataTypes.STRING(250),
      allowNull: true,
      defaultValue: null
    },
    deduction_group: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'deductiongroup',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'payrollemployees',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "payrollemployees_employee_key",
        unique: true,
        fields: [
          { name: "employee" },
        ]
      },
      {
        name: "payrollemployees_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
