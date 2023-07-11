const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeeexpenses', {
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
    expense_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    payment_method: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'expensespaymentmethods',
        key: 'id'
      }
    },
    transaction_no: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    payee: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    category: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'expensescategories',
        key: 'id'
      }
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    currency: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    attachment1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    attachment2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    attachment3: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("Approved","Pending","Rejected","Cancellation Requested","Cancelled","Processing"),
      allowNull: true,
      defaultValue: "Pending"
    }
  }, {
    sequelize,
    tableName: 'employeeexpenses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employeeexpenses_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
