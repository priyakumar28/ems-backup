'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('job', [{
      id:'3',
      title:'Developer',
      display:"jdshkfjdskjfhwuesdfkjw"
     
    },
    {
      id:'2',
      title:'Senior Developer',
      display:"jdshkfjdskjfhwuesdfkjw"
     
    }]);
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('job', null, {});
  }
};