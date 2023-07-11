const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeecompanyloans', {
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
    loan: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'companyloans',
        key: 'id'
      }
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    last_installment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    period_months: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    currency: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    monthly_installment: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("Approved","Repayment","Paid","Suspended"),
      allowNull: true,
      defaultValue: "Approved"
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employeecompanyloans',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employeecompanyloans_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
