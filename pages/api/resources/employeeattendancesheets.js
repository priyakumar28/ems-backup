const employeeResource = require('./employees')
module.exports = {
    transform(employeeattendancesheet) {
        if(employeeattendancesheet && typeof employeeattendancesheet === "object"){
        return {
            'id': employeeattendancesheet.id,
            'employee_id': employeeResource.transform(employeeattendancesheet.employee) ,
            'date_start': employeeattendancesheet.date_start, 
            'date_end': employeeattendancesheet.date_end,
            'status': employeeattendancesheet.status,
        };
    }
    return{};
    },
    transformCollection(employeeattendancesheets) {
        employeeattendancesheets = typeof employeeattendancesheets === "object" ? employeeattendancesheets : [];
        var data = [];
        for (var i = 0; i < employeeattendancesheets?.length; i++) {
            data.push(this.transform(employeeattendancesheets[i]));
        }
        return data;
    }

};