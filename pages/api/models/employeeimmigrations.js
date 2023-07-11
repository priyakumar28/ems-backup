const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeeimmigrations', {
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
    document: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'immigrationdocuments',
        key: 'id'
      }
    },
    documentname: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    valid_until: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("Active","Inactive","Draft"),
      allowNull: true,
      defaultValue: "Active"
    },
    details: {
      type: DataTypes.TEXT,
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
    }
  }, {
    sequelize,
    tableName: 'employeeimmigrations',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employeeimmigrations_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
