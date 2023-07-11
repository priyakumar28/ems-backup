const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('employeeeducations', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    education_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'educations',
        key: 'id'
      }
    },
    education_name: {
      type: DataTypes.STRING(250),
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
    institute: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null
    },
    date_start: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    date_end: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    attachment: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employeeeducations',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employeeeducations_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
