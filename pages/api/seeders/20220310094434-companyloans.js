'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('companyloans',[{
     name:"haripriya", 
     details: "homeloan"
    },{
      name:"siva", 
     details: "homeloan"
    },{
      name:"keerthana", 
      details: "homeloan"
    },{
      name:"vino", 
      details: "homeloan"
    }])
  },


  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('employees',null,{});
  }
};
