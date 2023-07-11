'use strict';

const ret = require("bluebird/js/release/util");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('country', [
      {code:'IN',namecap:'New Delhi',name:'INDIA',iso3:'IND',numcode:1},
      {code:'AU',namecap:'Sydney',name:'AUSTRALIA',iso3:'AUS',numcode:2},
      {code:'US',namecap:'New York',name:'UNITED STATES AMERICA',iso3:'USA',numcode:3}

     ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('country', null, {});  
  }
};
