module.exports = {
  up: (queryInterface, Sequelize) => {
    // Product belongsToMany Tag
    return queryInterface.createTable(
      'employeeprojectuserroles',
      {
        employeeprojectId: {
          type: Sequelize.BIGINT,
          primaryKey: true,
        },
        userroleId: {
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
    return queryInterface.dropTable('employeeprojectuserroles');
  },
};
