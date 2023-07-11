const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('courses', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(300),
      allowNull: false,
      unique:"courses_code_key"
    },
    name: {
      type: DataTypes.STRING(300),
      allowNull: false,
      unique:"courses_name_key"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    coordinator: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    trainer: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    trainer_info: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    paymenttype: {
      type: DataTypes.ENUM("Company Sponsored","Paid by Employee"),
      allowNull: true,
      defaultValue: "Company Sponsored"
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    cost: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0.00
    },
    cost_code:{
      type: DataTypes.STRING(30),
      allowNull: true

    },
    status: {
      type: DataTypes.ENUM("Active","Inactive"),
      allowNull: true,
      defaultValue: "Active"
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    contact_number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    contact_mail: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    trainer_from: {
      type: DataTypes.ENUM("Internal","External"),
      allowNull: true,
      defaultValue: "Internal"
    },

  }, {
    sequelize,
    tableName: 'courses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "courses_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
