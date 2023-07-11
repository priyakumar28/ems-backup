'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('trainingsessions', [{
        name:'Backend training session',
        course: 4

        // description:'Front-End development',
        // deliverylocation:'Chennai'
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('trainingsessions',null,{});
  }
};
