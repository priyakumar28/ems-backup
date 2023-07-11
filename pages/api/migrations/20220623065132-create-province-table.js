'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('province', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(40),
        allowNull: false,
        defaultValue: ""
      },
      code: {
        type: Sequelize.CHAR(2),
        allowNull: false,
        defaultValue: ""
      },
      country: {
        type: Sequelize.CHAR(3),
        allowNull: false
      }
    }, {
      Sequelize,
      tableName: 'province',
      schema: 'public',
      timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('province');
  }
};