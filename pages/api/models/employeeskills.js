const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('employeeskills', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    skill_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'skills',
        key: 'id'
      },
      unique: "employeeskills_employee_skill_id_key"
    },
    skill_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    is_certified: {
      type: Sequelize.DataTypes.ENUM("Yes", "No"),
      allowNull: false,
      defaultValue: "No",
    },
    attachment: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
    },
    employee: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id'
      },
      unique: "employeeskills_employee_skill_id_key"
    },
    date_start: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    date_end: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    details: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    tableName: 'employeeskills',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employeeskills_employee_skill_id_key",
        unique: true,
        fields: [
          { name: "employee" },
          { name: "skill_id" },
        ]
      },
      {
        name: "employeeskills_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
