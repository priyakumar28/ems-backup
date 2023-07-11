const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeeapprovals', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "employeeapprovals_type_element_level_key"
    },
    element: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: "employeeapprovals_type_element_level_key"
    },
    approver: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: "employeeapprovals_type_element_level_key"
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
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
    tableName: 'employeeapprovals',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employeeapprovals_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "employeeapprovals_type",
        fields: [
          { name: "type" },
        ]
      },
      {
        name: "employeeapprovals_type_element",
        fields: [
          { name: "type" },
          { name: "element" },
        ]
      },
      {
        name: "employeeapprovals_type_element_level_key",
        unique: true,
        fields: [
          { name: "type" },
          { name: "element" },
          { name: "level" },
        ]
      },
      {
        name: "employeeapprovals_type_element_status_level",
        fields: [
          { name: "type" },
          { name: "element" },
          { name: "status" },
          { name: "level" },
        ]
      },
    ]
  });
};
