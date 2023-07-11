'use strict';

const ret = require("bluebird/js/release/util");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('province', [
      {code:'US',name:'us province',country:'US'},
      {code:'AS',name:'aus province',country:'Au'},

     ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('province', null, {});  
  }
};
