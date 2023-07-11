'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('immigrationstatus', [{
      name: 'siddusiddu',
      
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('immigrationstatus', null, {});
  }
};
