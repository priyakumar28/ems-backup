const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('payrollcolumns', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null
    },
    calculation_hook: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null
    },
    salary_components: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null
    },
    deductions: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null
    },
    add_columns: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null
    },
    sub_columns: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null
    },
    colorder: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    editable: {
      type: DataTypes.ENUM("Yes", "No"),
      allowNull: true,
      defaultValue: "Yes"
    },
    enabled: {
      type: DataTypes.ENUM("Yes", "No"),
      allowNull: true,
      defaultValue: "Yes"
    },
    default_value: {
      type: DataTypes.STRING(25),
      allowNull: true,
      defaultValue: null
    },
    calculation_columns: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null
    },
    calculation_function: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    tableName: 'payrollcolumns',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "payrollcolumns_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
