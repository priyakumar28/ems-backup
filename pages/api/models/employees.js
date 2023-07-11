const { truncate } = require("fs");
const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employees",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      employee_id: {
        type: DataTypes.STRING(50),
        unique: "employees_employee_id_key",
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "",
      },
      middle_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      profile_pic: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      nationality: {
        type: DataTypes.STRING,
        allowNull: true
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Others"),
        allowNull: true,
      },
      probation: {
        type: Sequelize.DataTypes.ENUM("Active", "Completion", "Extension", "Pre-Confirmation"),
        allowNull: false,////fix
        defaultValue: "Active",
      },
      marital_status: {
        type: DataTypes.ENUM("Married", "Single", "Divorced", "Widowed", "Other"),
        allowNull: true,
      },
      ssn_num: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      nic_num: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      other_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      driving_license: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      driving_license_exp_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      employment_status: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "employmentstatus",
          key: "id",
        },
      },
      job_title: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "jobtitles",
          key: "id",
        },
      },
      pay_grade: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "paygrades",
          key: "id",
        },
      },
      work_station_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      address1: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      address2: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      city: {
        type: DataTypes.STRING(150),
        allowNull: true,
        defaultValue: null,
      },
      country: {
        type: DataTypes.CHAR(3),
        allowNull: true
      },
      province: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "province",
          key: "id",
        },
      },
      zipcode: {
        type: DataTypes.STRING(20),
        allowNull: true,
        defaultValue: null,
      },
      home_phone: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
      mobile_phone: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
      work_phone: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
      work_email: {
        type: DataTypes.STRING(100),
        unique: "employees_work_email_key",
      },
      private_email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      joined_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      confirmation_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      supervisor: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "employees",
          key: "id",
        },
      },
      indirect_supervisors: {
        type: DataTypes.STRING(250),
        allowNull: true,
        defaultValue: null,
      },
      department: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'department',
          key: 'id'
        }
      },
      designation: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'designation',
          key: 'id'
        }
      },
      pre_address1: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      pre_address2: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      pre_city: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      pre_state: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
      pre_country: {
        type: DataTypes.STRING(3),
        allowNull: true
      },
      pre_zipcode: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: null,
      },
      pan_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
        defaultValue: null,
      },
      religion: {
        type: DataTypes.STRING(20),
        allowNull: true,
        defaultValue: null,
      },
      aadhar_number: {
        type: DataTypes.STRING(12),
        allowNull: true,
        defaultValue: null,
      },
      native_state: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
      blood_group: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: null,
      },

      state: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
      custom6: {
        type: DataTypes.STRING(250),
        allowNull: true,
        defaultValue: null,
      },
      custom7: {
        type: DataTypes.STRING(250),
        allowNull: true,
        defaultValue: null,
      },
      custom8: {
        type: DataTypes.STRING(250),
        allowNull: true,
        defaultValue: null,
      },
      custom9: {
        type: DataTypes.STRING(250),
        allowNull: true,
        defaultValue: null,
      },
      custom10: {
        type: DataTypes.STRING(250),
        allowNull: true,
        defaultValue: null,
      },
      termination_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("Probation", "Active", "Long absense", "Terminated", "Deceased", "Resigned"),
        allowNull: true,
        defaultValue: "Probation",
      },
      probation_completion_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null
      },
      reason: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      ethnicity: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      immigration_status: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      approver1: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      approver2: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      approver3: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
          min: 120,
          max: 240
        }
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
          min: 40,
          max: 150
        }
      },
      passport_num: {
        type: DataTypes.STRING,
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
      },
      long_absence_from: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      long_absence_to: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      terminated_on: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      resigned_on: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      last_working_day: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      is_welcome_email_sent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_welcome_email_sent: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      sequelize,
      tableName: "employees",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "employees_employee_id_key",
          unique: true,
          fields: [{ name: "employee_id" }],
        },
        {
          name: "employees_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
