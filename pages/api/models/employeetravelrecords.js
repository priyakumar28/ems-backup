const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('employeetravelrecords', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    employee: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.ENUM("Local", "International"),
      allowNull: true,
      defaultValue: "Local"
    },
    purpose: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    travel_from: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    travel_to: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    travel_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    details: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null
    },
    funding: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    currency: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    attachment1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    attachment2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    attachment3: {
      type: DataTypes.STRING(100),
      allowNull: true
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
      type: DataTypes.ENUM("Approved", "Pending", "Rejected", "Cancellation Requested", "Cancelled", "Processing"),
      allowNull: true,
      defaultValue: "Pending"
    }
  }, {
    sequelize,
    tableName: 'employeetravelrecords',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employeetravelrecords_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
