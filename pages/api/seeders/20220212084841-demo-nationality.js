'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('nationality', [{
     name:'Christian'
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('nationality', null, {});
  }
};
