// const employeeovertimeresources = require('./employees')
// const overtimecategoriesresources = require('./overtimecategories')

module.exports = {
    //single transformation
    transform(employeeovertime) {
        if (employeeovertime && typeof employeeovertime === "object")
            return {
                'id': employeeovertime.id,
                // 'employee_id': employeeovertimeresources.transform(employeeovertime.employee),
                'start_time': employeeovertime.start_time,
                'end_time': employeeovertime.end_time,
                // 'category_id': overtimecategoriesresources.transform(employeeovertime.category),
                'project': employeeovertime.project,
                'notes': employeeovertime.notes,
                'created': employeeovertime.created,
                'updated': employeeovertime.updated,
                'status': employeeovertime.status

            };
        return {};
    },
    //
    transformCollection(employeeovertime) {
        employeeovertime = typeof employeeovertime === "object" ? employeeovertime : [];
        var data = [];
        for (var i = 0; i < employeeovertime.length; i++) {
            data.push(this.transform(employeeovertime[i]));
        }
        return data;
    }
};