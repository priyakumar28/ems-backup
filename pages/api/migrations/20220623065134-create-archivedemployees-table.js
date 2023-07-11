'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('archivedemployees', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      ref_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      employee_id: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: ""
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: ""
      },
      gender: {
        type: Sequelize.ENUM("Male", "Female"),
        allowNull: true
      },
      ssn_num: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: ""
      },
      nic_num: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: ""
      },
      other_id: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: ""
      },
      work_email: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null
      },
      joined_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      confirmation_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      supervisor: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      department: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      termination_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      data: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'archivedemployees',
      schema: 'public',
      timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('archivedemployees');
  }
};