'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeeleavedays', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      employee_leave: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'employeeleaves',
          key: 'id'
        }
      },
      leave_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      leave_type: {
        type: Sequelize.ENUM("Full Day", "Half Day - Morning", "Half Day - Afternoon", "1 Hour - Morning", "2 Hours - Morning", "3 Hours - Morning", "1 Hour - Afternoon", "2 Hours - Afternoon", "3 Hours - Afternoon"),
        allowNull: false
      }
    }, {
      Sequelize,
      tableName: 'employeeleavedays',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeeleavedays');
  }
};