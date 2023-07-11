module.exports = {
  up: (queryInterface, Sequelize) => {
    // Product belongsToMany Tag
    return queryInterface.createTable(
      'userrolemodules',
      {
        userroleId: {
          type: Sequelize.BIGINT,
          primaryKey: true,
        },
        moduleId: {
          type: Sequelize.BIGINT,
          primaryKey: true,
        },
         createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    // remove table
    return queryInterface.dropTable('userrolemodules');
  },
};