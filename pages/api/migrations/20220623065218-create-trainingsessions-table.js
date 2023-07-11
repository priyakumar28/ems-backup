'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trainingsessions', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      course: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id'
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      scheduled: {
        type: Sequelize.DATE,
        allowNull: true
      },
      duedate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      deliverymethod: {
        type: Sequelize.ENUM("Classroom", "Self Study", "Online"),
        allowNull: true,
        defaultValue: "Classroom"
      },
      deliverylocation: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM("Pending", "Approved", "Completed", "Cancelled"),
        allowNull: true,
        defaultValue: "Pending"
      },
      attendancetype: {
        type: Sequelize.ENUM("Sign Up", "Assign"),
        allowNull: true,
        defaultValue: "Sign Up"
      },
      attachment: {
        type: Sequelize.STRING(300),
        allowNull: true
      },
      created: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: true
      },
      requireproof: {
        type: Sequelize.ENUM("Yes", "No"),
        allowNull: true,
        defaultValue: "Yes"
      }
    }, {
      Sequelize,
      tableName: 'trainingsessions',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trainingsessions');
  }
};