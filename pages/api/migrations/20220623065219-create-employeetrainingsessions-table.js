'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeetrainingsessions', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      employee: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "employees",
          key: "id",
        },
      },
      trainingsession: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "trainingsessions",
          key: "id",
        },
      },
      feedback: {
        type: Sequelize.STRING(1500),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(
          "Scheduled",
          "Attended",
          "Not-Attended",
          "Completed"
        ),
        allowNull: true,
        defaultValue: "Scheduled",
      },
      proof: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
    },
    {
      Sequelize,
      tableName: "employeetrainingsessions",
      schema: "public",
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeetrainingsessions');
  }
};