const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('companydocuments', {
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
    valid_until: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("Active","Inactive","Draft"),
      allowNull: true,
      defaultValue: "Active"
    },
    notify_employees: {
      type: DataTypes.ENUM("Yes","No"),
      allowNull: true,
      defaultValue: "Yes"
    },
    attachment: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    share_departments: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    share_employees: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    share_userlevel: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'companydocuments',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "companydocuments_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
