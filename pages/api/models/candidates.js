const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('candidates', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
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
    nationality: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female"),
      allowNull: true
    },
    marital_status: {
      type: DataTypes.ENUM("Married", "Single", "Divorced", "Widowed", "Other"),
      allowNull: true
    },
    address1: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: ""
    },
    address2: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: ""
    },
    city: {
      type: DataTypes.STRING(150),
      allowNull: true,
      defaultValue: ""
    },
    country: {
      type: DataTypes.CHAR(3),
      allowNull: true,
      defaultValue: null
    },
    province: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    postal_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null
    },
    home_phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null
    },
    mobile_phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null
    },
    cv_title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ""
    },
    cv: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    cvtext: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    industry: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profileimage: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    head_line: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    objective: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    work_history: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    education: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    skills: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    referees: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    linkedinurl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null
    },
    linkedindata: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    totalyearsofexperience: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    totalmonthsofexperience: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    htmlcvdata: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    generatedcvfile: {
      type: DataTypes.STRING(150),
      allowNull: true,
      defaultValue: null
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expectedsalary: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    preferedpositions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    preferedjobtype: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: null
    },
    preferedcountries: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    calls: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hash: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    linkedinprofilelink: {
      type: DataTypes.STRING(250),
      allowNull: true,
      defaultValue: null
    },
    linkedinprofileid: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null
    },
    facebookprofilelink: {
      type: DataTypes.STRING(250),
      allowNull: true,
      defaultValue: null
    },
    facebookprofileid: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null
    },
    twitterprofilelink: {
      type: DataTypes.STRING(250),
      allowNull: true,
      defaultValue: null
    },
    twitterprofileid: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null
    },
    googleprofilelink: {
      type: DataTypes.STRING(250),
      allowNull: true,
      defaultValue: null
    },
    googleprofileid: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    tableName: 'candidates',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "candidates_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
