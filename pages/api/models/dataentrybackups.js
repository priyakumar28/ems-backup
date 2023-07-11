const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('dataentrybackups', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    tabletype: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dataentrybackups',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "dataentrybackups_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
