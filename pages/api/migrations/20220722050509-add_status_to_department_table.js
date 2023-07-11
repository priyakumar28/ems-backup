"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        const promises = [];
        return queryInterface.describeTable('department').then(tableDefinition => {
            if (!tableDefinition['status']) {
                promises.push(queryInterface.addColumn('department', 'status', {
                    type: Sequelize.ENUM("Active", "In Active"),
                    allowNull: true,
                    defaultValue: "Active"
                }));
            }
            return Promise.all(promises);
        });

    },

    async down(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn("department", "status", { transaction: t })
            ]);
        });
    },
};
