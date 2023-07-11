'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('job', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      shortdescription: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      requirements: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      benefits: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      country: {
        type: Sequelize.CHAR(3),
        allowNull: true
      },
      company: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      department: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      code: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      employementtype: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      industry: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      experiencelevel: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      jobfunction: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      educationlevel: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      currency: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      showsalary: {
        type: Sequelize.ENUM("Yes", "No"),
        allowNull: true
      },
      salarymin: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      salarymax: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      keywords: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM("Active", "On hold", "Closed"),
        allowNull: true
      },
      closingdate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      attachment: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      display: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      postedby: {
        type: Sequelize.BIGINT,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'job',
      schema: 'public',
      timestamps: false
    });

    let indexes = [
      {
        name: "job_status",
        unique: false,
        fields: [
          { name: "status" },
        ]
      }
    ];

    await migrationsAddIndexes(indexes, queryInterface, 'job');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('job');
  }
};