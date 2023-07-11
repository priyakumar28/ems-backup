'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employerdocuments', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      user: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      document: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'documents',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      date_added: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      valid_until: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      approval_status: {
        type: Sequelize.ENUM("Approved", "Pending", "Rejected"),
        allowNull: true,
        defaultValue: "Approved"
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      attachment: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      signature: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      expire_notification_last: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      doc_type: {

        type: Sequelize.ENUM("REX approval forms", "L1 assessment forms", "HR assessment forms"),
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'employerdocuments',
      schema: 'public',
      timestamps: false,
    });
    let indexes = [
        {
          name: "key_employerdocuments_valid_until",
          fields: [
            { name: "valid_until" },
          ]
        }
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'employerdocuments');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employerdocuments');
  }
};