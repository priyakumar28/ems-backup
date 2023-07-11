'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('currencytypes', [{
        code:'INR',
        name: 'Rupee',
      },{
        code:'RUS', 
        name:'Ruble'
      },{
        code:'USD',
        name:'Dollar'
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('currencytypes', null, {});
     
  }
};
