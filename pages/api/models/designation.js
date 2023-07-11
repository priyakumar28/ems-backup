const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('designation', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: "designation_code_key"
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: "designation_name_key"
        },
        department: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'department',
                key: 'id'
            }
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
        tableName: 'designation',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "designation_name_key",
                unique: true,
                fields: [
                    { name: "name" },
                ]
            },
            {
                name: "designation_code_key",
                unique: true,
                fields: [
                    { name: "code" },
                ]
            }
        ]
    });
};
