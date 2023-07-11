const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('payroll', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    pay_period: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    department: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    column_template: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    columns: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null
    },
    date_start: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    date_end: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("Draft", "Completed", "Processing"),
      allowNull: true,
      defaultValue: "Draft"
    },
    paysliptemplate: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'payroll',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "payroll_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
