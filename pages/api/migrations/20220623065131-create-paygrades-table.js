'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('paygrades', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null
      },
      currency: {
        type: Sequelize.STRING(3),
        allowNull: false,
        references: {
          model: 'currencytypes',
          key: 'code'
        }
      },
      min_salary: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        defaultValue: 0.00
      },
      max_salary: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        defaultValue: 0.00
      }
    }, {
      Sequelize,
      tableName: 'paygrades',
      schema: 'public',
      timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('paygrades');
  }
};