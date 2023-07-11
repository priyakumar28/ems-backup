const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reports', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,                    
      unique: "reports_name_key"
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    parameters: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    query: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    paramorder: {
      type: DataTypes.STRING(500),
      allowNull: false
    }, 
    type: {
      type: DataTypes.ENUM("Query","Class"),
      allowNull: true,
      defaultValue: "Query"
    },
    report_group: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    output: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: "CSV"
    }
  }, {
    sequelize,
    tableName: 'reports',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "reports_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "reports_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
