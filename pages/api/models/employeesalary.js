const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeesalary', {
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
    component: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    pay_frequency: {
      type: DataTypes.ENUM("Hourly","Daily","Bi Weekly","Weekly","Semi Monthly","Monthly"),
      allowNull: true
    },
    currency: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'currencytypes',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employeesalary',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employeesalary_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
