const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('restaccesstokens', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: "restaccesstokens_userid_key"
    },
    hash: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: null
    },
    token: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null
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
    tableName: 'restaccesstokens',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "restaccesstokens_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "restaccesstokens_userid_key",
        unique: true,
        fields: [
          { name: "userid" },
        ]
      },
    ]
  });
};
