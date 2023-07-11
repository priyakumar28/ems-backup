const leave_type_service = require("../leave/leavetypes_service");
const leave_rule_service = require("../leave/leaverules_service");
const leave_starting_balance_service = require("../leave/leavestartingbalance_service");
const leave_groupemployees_service = require('../leave/leavegroupemployees_service ');
const employee_leave_days_service = require('../leave/employeeleavedays');


module.exports ={
    leave_type_service,
    leave_rule_service,
    leave_starting_balance_service,
    leave_groupemployees_service,
    employee_leave_days_service
}