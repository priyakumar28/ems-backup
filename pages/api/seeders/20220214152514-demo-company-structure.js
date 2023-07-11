'use strict';

const ret = require("bluebird/js/release/util");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('companystructures', [
      {title:'BAssure',description:'description',address:'chennai',type:'Company',
    heads:'test'}

     ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('companystructures', null, {});  
  }
};
