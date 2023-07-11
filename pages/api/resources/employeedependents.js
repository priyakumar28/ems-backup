const employeeResource = require('./employees');
module.exports = {
    transform(employeedependent) {
        if(employeedependent&& typeof employeedependent ==="object"){
        return {
            'id': employeedependent.id,
            'name': employeedependent.name,
            'relationship': employeedependent.relationship,
            'dob': employeedependent.dob,
            'employee': employeeResource.transform(employeedependent.employee_employee)
            //'employee':employeedependent.employee_employee
        };
    }
    return{}
    },
    transformCollection(employeedependents) {
        employeedependents = typeof employeedependents === "object" ? employeedependents : [];
        var data = [];
        for (var i = 0; i < employeedependents?.length; i++) {
            data.push(this.transform(employeedependents[i]));
        }
        return data;
    }
};