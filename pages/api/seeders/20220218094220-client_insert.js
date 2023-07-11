'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('clients',[{
      name:"rufus"},
      {name:"ragesh"}
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('clients', null, {});
  }
};
