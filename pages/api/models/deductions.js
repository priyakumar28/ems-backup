const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('deductions', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    componenttype: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    component: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    payrollcolumn: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rangeamounts: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'deductions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "deductions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
