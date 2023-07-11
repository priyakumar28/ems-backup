const employeeResource = require('./employees');
const leavetypeResource = require('./leavetypes');
const leaveperiodResource = require('./leaveperiods');

module.exports = {
    transform(employeeleave) {
        if (employeeleave && typeof employeeleave === "object") {
            return {
                'id': employeeleave.id,
                'Employee': employeeResource.transform(employeeleave.employee),
                'leaveType': leavetypeResource.transform(employeeleave.leave_type),
                'leavePeriod': leaveperiodResource.transform(employeeleave.leave_period),
                'startDate':employeeleave.date_start,
                'endDate':employeeleave.date_end,
                'details':employeeleave.details,
                'status':employeeleave.status,
                'attachment':employeeleave.attachment
            }
        }
        return {};
    },

    transformCollection(employeeleaves, role_id) {
        employeeleaves = typeof employeeleaves === "object" ? employeeleaves : [];
        var data = [];
        for (var i = 0; i < employeeleaves?.length; i++) {
            data.push(this.transform(employeeleaves[i], role_id));
        }
        return data;
    }

};