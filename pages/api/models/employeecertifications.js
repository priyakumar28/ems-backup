const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('employeecertifications', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    certification_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'certifications',
        key: 'id'
      },
      unique: "employeecertifications_employee_certification_id_key"
    },
    certification_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    employee: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id'
      },
      unique: "employeecertifications_employee_certification_id_key"
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
    }
  }, {
    sequelize,
    tableName: 'employeecertifications',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employeecertifications_employee_certification_id_key",
        unique: true,
        fields: [
          { name: "employee" },
          { name: "certification_id" },
        ]
      },
      {
        name: "employeecertifications_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
