const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('modules', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    menu: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "modules_name_key"
    },
    label: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mod_group: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    mod_order: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("Enabled","Disabled"),
      allowNull: true,
      defaultValue: "Enabled"
    },
    version: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: ""
    },
    update_path: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: ""
    },
    user_levels: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    user_roles: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'modules',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "modules_name_mod_group_key",
        unique: true,
        fields: [
          { name: "name" },
          { name: "mod_group" },
        ]
      },
      {
        name: "modules_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
