const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('migrations', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    file: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "migrations_file_key"
    },
    version: {
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
    },
    status: {
      type: DataTypes.ENUM("Pending","Up","Down","UpError","DownError"),
      allowNull: true,
      defaultValue: "Pending"
    },
    last_error: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'migrations',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "key_migrations_status",
        fields: [
          { name: "status" },
        ]
      },
      {
        name: "key_migrations_version",
        fields: [
          { name: "version" },
        ]
      },
      {
        name: "migrations_file_key",
        unique: true,
        fields: [
          { name: "file" },
        ]
      },
      {
        name: "migrations_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
