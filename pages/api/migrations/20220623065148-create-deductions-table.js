'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('deductions', {
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
      componenttype: {
        type: Sequelize.STRING(250),
        allowNull: true
      },
      component: {
        type: Sequelize.STRING(250),
        allowNull: true
      },
      payrollcolumn: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      rangeamounts: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      deduction_group: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'deductiongroup',
          key: 'id'
        }
      }
    }, {
      Sequelize,
      tableName: 'deductions',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('deductions');
  }
};