"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        const promises = [];
        return queryInterface.describeTable('employeeeducations').then(tableDefinition => {
            if (!tableDefinition['attachment']) {
                promises.push(queryInterface.addColumn('employeeeducations', 'attachment', {
                    type: Sequelize.JSONB,
                    allowNull: true
                }));
            } 
            return Promise.all(promises);
        });

    },

    async down(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn("employeeeducations", "attachment", { transaction: t })
            ]);
        });
    },
};
