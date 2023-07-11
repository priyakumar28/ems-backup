const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('crons', {
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
    class: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    lastrun: {
      type: DataTypes.DATE,
      allowNull: true
    },
    frequency: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM("Minutely","Hourly","Daily","Weekly","Monthly","Yearly"),
      allowNull: true,
      defaultValue: "Hourly"
    },
    status: {
      type: DataTypes.ENUM("Enabled","Disabled"),
      allowNull: true,
      defaultValue: "Enabled"
    }
  }, {
    sequelize,
    tableName: 'crons',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "crons_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "key_crons_frequency",
        fields: [
          { name: "frequency" },
        ]
      },
    ]
  });
};
