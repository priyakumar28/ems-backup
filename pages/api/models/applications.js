const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('applications', {
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
      },
      unique: "applications_job_candidate_key"
    },
    candidate: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'candidates',
        key: 'id'
      },
      unique: "applications_job_candidate_key"
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    referredbyemail: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'applications',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "applications_job_candidate_key",
        unique: true,
        fields: [
          { name: "job" },
          { name: "candidate" },
        ]
      },
      {
        name: "applications_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
