const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('expensescategories', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    pre_approve: {
      type: DataTypes.ENUM("Yes","No"),
      allowNull: true,
      defaultValue: "Yes"
    }
  }, {
    sequelize,
    tableName: 'expensescategories',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "expensescategories_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
