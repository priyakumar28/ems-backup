"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("courses", [
      {
        code: "NJS",
        name: "nodeJs",
        description: "Learn nodeJs in 60 days",
        coordinator: 1,
        trainer: "Kannan",
        trainer_info: "50 years of industry experience",
      },
      {
        code: "React.js",
        name: "reactjs",
        description: "Learn reactjs in 10 days",
        coordinator: 1,
        trainer: "Kannan",
        trainer_info: "50 years of industry experience",
      },
      {
        code: "PYC",
        name: "Python",
        description: "Learn nodeJs in 60 days",
        coordinator: 11,
        trainer: "Jung Lee",
        trainer_info: "5 years of industry experience",
      },
      {
        code: "CKG",
        name: "Cooking",
        description: "Learn cooking in 60 days and end up eating your own mess",
        coordinator: 17,
        trainer: "Gowardhan",
        trainer_info: "Too many years of cooking experience",
      },
      {
        code: "ACT",
        name: "acting",
        description: "Learn to ruin bollywood in 60 days",
        coordinator: 18,
        trainer: "Deepak",
        trainer_info: "5 years of industry experience",
      },
      {
        code: "WLS",
        name: "Wildlife",
        description: "Learn nodeJs in 60 days",
        coordinator: 12,
        trainer: "Endangered",
        trainer_info: "5 years of industry experience",
      },
      {
        code: "NJS",
        name: "nodeJs",
        description: "Learn nodeJs in 60 days",
        coordinator: 13,
        trainer: "Raj",
        trainer_info: "5 years of industry experience",
      },
      {
        code: "RCG",
        name: "racing",
        description:
          "Learn to crash your bike in 60 days due to drinking and riding",
        coordinator: 39,
        trainer: "Jamal",
        trainer_info:
          "He once had 10 years of experience in ruining his reputation",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("courses", null, {});
  },
};
