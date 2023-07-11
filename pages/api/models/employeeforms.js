const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeeforms', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    employee_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    form_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'forms',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM("Pending","Completed"),
      allowNull: true,
      defaultValue: "Pending"
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employeeforms',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employeeforms_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
