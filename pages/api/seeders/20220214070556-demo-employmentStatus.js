'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('employmentstatus', [
      {name:'active',description:'employement status is active'},
      {name:'in-active',description:'employement status is in-active'},
      {name:'on-hold',description:'employement status is on-hold'},
      {name:'new',description:'employement status is new'},
     ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('employmentstatus', null, {});
  }
};
