const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "users_username_key"
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "users_email_key"
    },
    employee: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    default_module: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    user_level: {
      type: DataTypes.ENUM("Admin","Employee","Manager","Other"),
      allowNull: false,
      defaultValue: "Employee"
    },
    user_roles: {
      type: DataTypes.BIGINT,
       allowNull: true
    },
    profile_pic: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    login_hash: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: null
    },
    lang: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'supportedlanguages',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "login_hash_index",
        fields: [
          { name: "login_hash" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "users_username_key",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "users_email_key",
        unique:true,
        fields: [
          {name: "email"}
        ]
      }
    ]
  });
};
