const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('permissions', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_level: {
      type: DataTypes.ENUM("Admin", "Employee", "Manager"),
      allowNull: false,
      defaultValue: "Employee"
    },
    user_role: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: "permissions_user_role_module_id_key"
    },
    module_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: "permissions_user_role_module_id_key"
    },
    meta: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null
    },
    value: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    tableName: 'permissions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "permissions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      }
    ]
  });
};
