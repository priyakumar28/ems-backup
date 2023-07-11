const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statuschangelogs', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    element: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    data: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    status_from: {
      type: DataTypes.ENUM("Approved","Pending","Rejected","Cancellation Requested","Cancelled","Processing"),
      allowNull: true,
      defaultValue: "Pending"
    },
    status_to: {
      type: DataTypes.ENUM("Approved","Pending","Rejected","Cancellation Requested","Cancelled","Processing"),
      allowNull: true,
      defaultValue: "Pending"
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'statuschangelogs',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "statuschangelogs_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
