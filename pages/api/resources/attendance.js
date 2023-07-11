const employeeResource = require('./employees')
module.exports = {
    transform(attendance) {
        if (attendance && typeof attendance === "object") {
        return {
            'id': attendance.id,
            'employee': employeeResource.transform(attendance.employee_employee),
            'in_time': attendance.in_time, 
            'out_time': attendance.out_time, 
            'note': attendance.note,
        };
    }
    return {};
    },

    transformCollection(attendances) {
        attendances = typeof attendances === "object" ? attendances : [];
        var data = [];
        for (var i = 0; i < attendances?.length; i++) {
            data.push(this.transform(attendances[i]));
        }
        return data;
    }

};