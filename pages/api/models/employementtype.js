const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employementtype', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'employementtype',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employementtype_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
