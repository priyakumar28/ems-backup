'use strict';
const { migrationsAddIndexes } = require("../db-helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      employee_id: {
        type: Sequelize.STRING(50),
        unique: "employees_employee_id_key",
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: "",
      },
      middle_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      profile_pic: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      nationality: {
        type: Sequelize.STRING,
        allowNull: true
      },
      birthday: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      gender: {
        type: Sequelize.ENUM("Male", "Female", "Others"),
        allowNull: true,
      },
      probation: {
        type: Sequelize.Sequelize.ENUM("Active", "Completion", "Extension", "Pre-Confirmation"),
        allowNull: false,
        defaultValue: "Active",
      },
      marital_status: {
        type: Sequelize.ENUM("Married", "Single", "Divorced", "Widowed", "Other"),
        allowNull: true,
      },
      ssn_num: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      nic_num: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      other_id: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      driving_license: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      driving_license_exp_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      employment_status: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "employmentstatus",
          key: "id",
        },
      },
      job_title: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "jobtitles",
          key: "id",
        },
      },
      pay_grade: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "paygrades",
          key: "id",
        },
      },
      work_station_id: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      address1: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      address2: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      city: {
        type: Sequelize.STRING(150),
        allowNull: true,
        defaultValue: null,
      },
      country: {
        type: Sequelize.CHAR(3),
        allowNull: true
      },
      province: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "province",
          key: "id",
        },
      },
      zipcode: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: null,
      },
      home_phone: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
      mobile_phone: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
      work_phone: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
      work_email: {
        type: Sequelize.STRING(100),
        unique: "employees_work_email_key",
      },
      private_email: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      joined_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      confirmation_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      supervisor: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "employees",
          key: "id",
        },
      },
      indirect_supervisors: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null,
      },
      department: {
        type: Sequelize.STRING,
        allowNull: true
      },
      designation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pre_address1: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      pre_address2: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      pre_city: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      pre_state: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
      pre_country: {
        type: Sequelize.STRING(3),
        allowNull: true
      },
      pre_zipcode: {
        type: Sequelize.STRING(10),
        allowNull: true,
        defaultValue: null,
      },
      pan_number: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: null,
      },
      religion: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: null,
      },
      aadhar_number: {
        type: Sequelize.STRING(12),
        allowNull: true,
        defaultValue: null,
      },
      native_state: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
      blood_group: {
        type: Sequelize.STRING(10),
        allowNull: true,
        defaultValue: null,
      },

      state: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
      custom6: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null,
      },
      custom7: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null,
      },
      custom8: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null,
      },
      custom9: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null,
      },
      custom10: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null,
      },
      termination_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("Active", "Long absense", "Terminated", "Deceased", "Resigned"),
        allowNull: true,
        defaultValue: "Active",
      },
      reason: {
        type: Sequelize.STRING(250),
        allowNull: true
      },
      ethnicity: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      immigration_status: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      approver1: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      approver2: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      approver3: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      height: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
          min: 120,
          max: 240
        }
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
          min: 40,
          max: 150
        }
      },
      passport_num: {
        type: Sequelize.STRING,
        allowNull: true
      },
      present_and_permanent_addres_same: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_reporting_manager: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
      {
        Sequelize,
        tableName: "employees",
        schema: "public",
        timestamps: false
    });

    let indexes = [
        {
          name: "employees_employee_id_key",
          unique: true,
          fields: [{ name: "employee_id" }],
        },
    ];
    
    await migrationsAddIndexes(indexes, queryInterface, 'employees');

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  }
};