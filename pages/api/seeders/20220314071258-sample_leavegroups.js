'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
      Example:
      await queryInterface.bulkInsert('leavegroups', [{
        name: 'Leave group 1',
        details:"lala"
      }, {

       name: 'Leave group 2',
        details: "lala"
       
        }, {

       name: 'Leave group 3',
       details: "lala"
       
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('leavegroups', null, {});
  
  }
};
