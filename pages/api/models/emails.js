const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('emails', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    subject: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    toemail: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    template: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    params: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cclist: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    bcclist: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    error: {
      type: DataTypes.STRING(500),
      allowNull: true
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
      type: DataTypes.ENUM("Pending","Sent","Error"),
      allowNull: true,
      defaultValue: "Pending"
    }
  }, {
    sequelize,
    tableName: 'emails',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "emails_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "key_emails_created",
        fields: [
          { name: "created" },
        ]
      },
      {
        name: "key_emails_status",
        fields: [
          { name: "status" },
        ]
      },
    ]
  });
};
