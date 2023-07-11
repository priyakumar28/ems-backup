'use strict';

module.exports = {
  async up(queryInterface) {
    let email = process.env.SUPER_ADMIN_EMAIL_ID;
    await queryInterface.bulkInsert('users', [{
      username: email.replace(/\@.*/g,"$'"),
      email: email,
      user_level: "Super Admin",
      created: new Date()
    }], {});
  },

  async down () {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
