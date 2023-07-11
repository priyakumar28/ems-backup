const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reportfiles', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    employee: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    attachment: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "reportfiles_attachment_key"
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'reportfiles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "reportfiles_attachment_key",
        unique: true,
        fields: [
          { name: "attachment" },
        ]
      },
      {
        name: "reportfiles_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
