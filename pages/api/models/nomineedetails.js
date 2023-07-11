const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('nomineedetails', {
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
    employee: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    state: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    district: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    address_pincode: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    relationship: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    createdAt: {
        allowNull: true,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
    }
  }, {
    sequelize,
    tableName: 'nomineedetails',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "nomineedetails_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
