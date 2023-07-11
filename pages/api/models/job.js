const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    shortdescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    requirements: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    benefits: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    country: {
      type: DataTypes.CHAR(3),
      allowNull: true
    },
    company: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    department: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    employementtype: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    industry: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    experiencelevel: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    jobfunction: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    educationlevel: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    currency: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    showsalary: {
      type: DataTypes.ENUM("Yes","No"),
      allowNull: true
    },
    salarymin: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    salarymax: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    keywords: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("Active","On hold","Closed"),
      allowNull: true
    },
    closingdate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    attachment: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    display: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    postedby: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'job',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "job_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "job_status",
        fields: [
          { name: "status" },
        ]
      },
    ]
  });
};
