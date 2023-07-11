const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('calls', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    job: {
      
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'job',
        key: 'id'
      } 
    },
    candidate: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'candidates',
        key: 'id'
      }
    },
    phone: {
      type: DataTypes.STRING(20),
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
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'calls',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "calls_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
