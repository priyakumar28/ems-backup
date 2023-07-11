'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('permissions', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      user_level: {
        type: Sequelize.ENUM("Admin", "Employee", "Manager"),
        allowNull: false,
        defaultValue: "Employee"
      },
      user_role: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: "permissions_user_role_module_id_key"
      },
      module_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: "permissions_user_role_module_id_key"
      },
      meta: {
        type: Sequelize.STRING(500),
        allowNull: true,
        defaultValue: null
      },
      value: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: null
      }
    }, {
      Sequelize,
      tableName: 'permissions',
      schema: 'public',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('permissions');
  }
};