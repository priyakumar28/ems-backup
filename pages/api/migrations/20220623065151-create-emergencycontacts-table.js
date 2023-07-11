'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('emergencycontacts', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      employee: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      relationship: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null
      },
      home_phone: {
        type: Sequelize.STRING(15),
        allowNull: true,
        defaultValue: null
      },
      work_phone: {
        type: Sequelize.STRING(15),
        allowNull: true,
        defaultValue: null
      },
      mobile_phone: {
        type: Sequelize.STRING(15),
        allowNull: true,
        defaultValue: null
      }
    }, {
      Sequelize,
      tableName: 'emergencycontacts',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('emergencycontacts');
  }
};