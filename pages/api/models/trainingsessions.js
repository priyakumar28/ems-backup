const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trainingsessions', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    course: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    scheduled: {
      type: DataTypes.DATE,
      allowNull: true
    },
    duedate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deliverymethod: {
      type: DataTypes.ENUM("Classroom","Self Study","Online"),
      allowNull: true,
      defaultValue: "Classroom"
    },
    deliverylocation: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("Pending","Approved","Completed","Cancelled"),
      allowNull: true,
      defaultValue: "Pending"
    },
    attendancetype: {
      type: DataTypes.ENUM("Sign Up","Assign"),
      allowNull: true,
      defaultValue: "Sign Up"
    },
    attachment: {
      type: DataTypes.STRING(300),
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
    requireproof: {
      type: DataTypes.ENUM("Yes","No"),
      allowNull: true,
      defaultValue: "Yes"
    }
  }, {
    sequelize,
    tableName: 'trainingsessions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "trainingsessions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
