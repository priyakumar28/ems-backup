const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeelanguages', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    language_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'languages',
        key: 'id'
      },
      unique: "employeelanguages_employee_language_id_key"
    },
    employee: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id'
      },
      unique: "employeelanguages_employee_language_id_key"
    },
    reading: {
      type: DataTypes.ENUM("Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency"),
      allowNull: true
    },
    speaking: {
      type: DataTypes.ENUM("Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency"),
      allowNull: true
    },
    writing: {
      type: DataTypes.ENUM("Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency"),
      allowNull: true
    },
    understanding: {
      type: DataTypes.ENUM("Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency"),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employeelanguages',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employeelanguages_employee_language_id_key",
        unique: true,
        fields: [
          { name: "employee" },
          { name: "language_id" },
        ]
      },
      {
        name: "employeelanguages_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
