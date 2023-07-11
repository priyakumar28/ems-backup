const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('department', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: "department_name_key"
        },
        code: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: "department_code_key"
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM("Active", "In Active"),
            allowNull: true,
            defaultValue: "Active"
        }
    }, {
        sequelize,
        tableName: 'department',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "department_name_key",
                unique: true,
                fields: [
                    { name: "name" },
                ]
            },
            {
                name: "department_code_key",
                unique: true,
                fields: [
                    { name: "code" },
                ]
            }
        ]
    });
};
