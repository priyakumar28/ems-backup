'use strict';

const ret = require("bluebird/js/release/util");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('jobtitles', [
      {code:'BA00121',name:'Associate Consultant',description:'software developer',specification:'developing code'},
      {code:'BA00122',name:'Juniour Developer',description:'software developer',specification:'developing code'},
      {code:'BA00123',name:'Senior Software Developer',description:'software developer',specification:'developing code'},
      {code:'BA00124',name:'HR Manager',description:'software developer',specification:'developing code'},
     ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('jobtitles', null, {});  
  }
};
