'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('employees',[{
      employee_id:200089,
        first_name: "Sanjeev",
        last_name: "Gunasekaran",
        
              
    },{
      employee_id:200092,
      first_name: "Akshay"
    },{
      employee_id:200094,
      first_name: "Sarath"
    },{
      employee_id:202909,
      first_name: "Salman Khan"
    }])
  },


  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('employees',null,{});
  }
};
