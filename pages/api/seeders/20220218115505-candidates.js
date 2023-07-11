'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('candidates', [{
          first_name:'suresh',
          last_name: 'mullangi',
          cv_title: 'sureshmullangi'
        }])
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkdelete('candidates', null ,{});
  }
};
