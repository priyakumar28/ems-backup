const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('emergencycontacts', {
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
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    relationship: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    home_phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
      defaultValue: null
    },
    work_phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
      defaultValue: null
    },
    mobile_phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    tableName: 'emergencycontacts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "emergencycontacts_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
