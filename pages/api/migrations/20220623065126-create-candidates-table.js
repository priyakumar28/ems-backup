'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('candidates', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: ""
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: ""
      },
      nationality: {
        type: Sequelize.STRING,
        allowNull: true
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: true
      },
      gender: {
        type: Sequelize.ENUM("Male", "Female"),
        allowNull: true
      },
      marital_status: {
        type: Sequelize.ENUM("Married", "Single", "Divorced", "Widowed", "Other"),
        allowNull: true
      },
      address1: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: ""
      },
      address2: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: ""
      },
      city: {
        type: Sequelize.STRING(150),
        allowNull: true,
        defaultValue: ""
      },
      country: {
        type: Sequelize.CHAR(3),
        allowNull: true,
        defaultValue: null
      },
      province: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      postal_code: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: null
      },
      email: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: null
      },
      home_phone: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null
      },
      mobile_phone: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null
      },
      cv_title: {
        type: Sequelize.STRING(200),
        allowNull: false,
        defaultValue: ""
      },
      cv: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      cvtext: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      industry: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      profileimage: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      head_line: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      objective: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      work_history: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      education: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      skills: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      referees: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      linkedinurl: {
        type: Sequelize.STRING(500),
        allowNull: true,
        defaultValue: null
      },
      linkedindata: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      totalyearsofexperience: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      totalmonthsofexperience: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      htmlcvdata: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      generatedcvfile: {
        type: Sequelize.STRING(150),
        allowNull: true,
        defaultValue: null
      },
      created: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: true
      },
      expectedsalary: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      preferedpositions: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      preferedjobtype: {
        type: Sequelize.STRING(60),
        allowNull: true,
        defaultValue: null
      },
      preferedcountries: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      tags: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      calls: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      hash: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null
      },
      linkedinprofilelink: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null
      },
      linkedinprofileid: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null
      },
      facebookprofilelink: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null
      },
      facebookprofileid: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null
      },
      twitterprofilelink: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null
      },
      twitterprofileid: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null
      },
      googleprofilelink: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null
      },
      googleprofileid: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null
      }
    }, {
      Sequelize,
      tableName: 'candidates',
      schema: 'public',
      timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('candidates');
  }
};