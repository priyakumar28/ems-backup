'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('companystructures', [{

      title: 'Structure 1',
      description: 'chehcsaiucjed',
      address: 'oijgirjfoir',
      type: 'Company',
      country: 'IN',
      timezone: 'Europe\/London',
      
    }, {

      title: 'Structure 2',
      description: 'chehcsaiucjed',
      address: 'oijgirjfoir',
      type: 'Head Office',
      country: 'SW',
      timezone: 'Europe\/Switzerland',

      }, {
      
      title: 'Structure 3',
      description: 'wkjndnwwdw',
      address: 'dscudsciwjdi',
      type: 'Regional Office',
      country: 'IN',
      timezone: 'Asia\/India',
      
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('companystructures', null, {});
     
  }
};
