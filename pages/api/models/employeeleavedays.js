const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeeleavedays', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    employee_leave: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'employeeleaves',
        key: 'id'
      }
    },
    leave_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    leave_type: {
      type: DataTypes.ENUM("Full Day","Half Day - Morning","Half Day - Afternoon","1 Hour - Morning","2 Hours - Morning","3 Hours - Morning","1 Hour - Afternoon","2 Hours - Afternoon","3 Hours - Afternoon"),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'employeeleavedays',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employeeleavedays_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
