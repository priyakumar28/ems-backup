const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('immigrationdocuments', {
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
    details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    required: {
      type: DataTypes.ENUM("Yes","No"),
      allowNull: true,
      defaultValue: "Yes"
    },
    alert_on_missing: {
      type: DataTypes.ENUM("Yes","No"),
      allowNull: true,
      defaultValue: "Yes"
    },
    alert_before_expiry: {
      type: DataTypes.ENUM("Yes","No"),
      allowNull: true,
      defaultValue: "Yes"
    },
    alert_before_day_number: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    tableName: 'immigrationdocuments',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "immigrationdocuments_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
