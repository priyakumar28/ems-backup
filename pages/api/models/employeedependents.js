const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('employeedependents', {
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
      type: DataTypes.ENUM("Child", "Spouse", "Parent", "Other"),
      allowNull: true
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    id_number: {
      type: DataTypes.STRING(25),
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    tableName: 'employeedependents',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employeedependents_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
