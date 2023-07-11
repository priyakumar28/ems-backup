  const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('archivedemployees', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    ref_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    employee_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female"),
      allowNull: true
    },
    ssn_num: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: ""
    },
    nic_num: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: ""
    },
    other_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: ""
    },
    work_email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    joined_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    confirmation_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    supervisor: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    department: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    termination_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'archivedemployees',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "archivedemployees_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
