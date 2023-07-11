'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeedatahistory', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      employee_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      field: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      old_value: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: null
      },
      new_value: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: null
      },
      description: {
        type: Sequelize.STRING(800),
        allowNull: true,
        defaultValue: null
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created: {
        type: Sequelize.DATE,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'employeedatahistory',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeedatahistory');
  }
};