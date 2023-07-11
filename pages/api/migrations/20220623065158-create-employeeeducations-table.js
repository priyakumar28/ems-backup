'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeeeducations', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      education_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'educations',
          key: 'id'
        }
      },
      education_name: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      employee: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      institute: {
        type: Sequelize.STRING(400),
        allowNull: true,
        defaultValue: null
      },
      date_start: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      date_end: {
        type: Sequelize.DATEONLY,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'employeeeducations',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeeeducations');
  }
};