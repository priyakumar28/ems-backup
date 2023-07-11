const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('employerdocuments', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        user: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        document: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'documents',
                key: 'id'
            }
        },
        current_password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        date_added: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        valid_until: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        approval_status: {
            type: DataTypes.ENUM("Approved", "Pending", "Rejected"),
            allowNull: true,
            defaultValue: "Approved"
        },
        details: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        attachment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        signature: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        expire_notification_last: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        doc_type: {
            type: DataTypes.ENUM("REX approval forms", "L1 assessment forms", "HR assessment forms"),
            allowNull: true
        },
        employee: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "employees",
                key: "id",
            }
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    }, {
        sequelize,
        tableName: 'employerdocuments',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "employerdocuments_pkey",
                unique: true,
                fields: [
                    { name: "id" },
                ]
            },
            {
                name: "key_employerdocuments_valid_until",
                fields: [
                    { name: "valid_until" },
                ]
            }
        ]
    });
};
