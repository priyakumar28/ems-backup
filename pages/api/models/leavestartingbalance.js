const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('leavestartingbalance', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    leave_type: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    employee: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    leave_period: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'leavestartingbalance',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "leavestartingbalance_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
