'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('projects',[{
      name:"rio",
      client:3
    },{
      name:"raieen",
      client:2
    }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('projects', null, {});
  }
};
