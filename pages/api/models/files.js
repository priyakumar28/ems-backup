const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('files', {
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
    filename: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "files_filename_key"
    },
    employee: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    file_group: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    size: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    size_text: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'files',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "files_filename_key",
        unique: true,
        fields: [
          { name: "filename" },
        ]
      },
      {
        name: "files_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
