'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leaveperiods', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      date_start: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      date_end: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM("Active", "Inactive"),
        allowNull: true,
        defaultValue: "Inactive"
      }
    }, {
      Sequelize,
      tableName: 'leaveperiods',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('leaveperiods');
  }
};