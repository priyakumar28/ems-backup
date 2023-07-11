const employeeleavesResource = require('./employeeleaves');
const usersResource = require('./users');
module.exports = {
    transform(employeeleavelog) {
        if (employeeleavelog && typeof employeeleavelog === "object") {
            return {
                'id': employeeleavelog.id,
                'employeeLeave': employeeleavesResource.transformCollection(employeeleavelog.employee_leave),
                'user': usersResource.transformCollection(employeeleavelog.user_id),
                'data': employeeleavelog.data,
                'statusFrom': employeeleavelog.status_from,
                'statusTo': employeeleavelog.status_to,
                'createdOn': employeeleavelog.created
            }
        }
        return {};
    },

    transformCollection(employeeleavelogs) {
        employeeleavelogs = typeof employeeleavelogs === "object" ? employeeleavelogs : [];
        var data = [];
        for (var i = 0; i < employeeleavelogs?.length; i++) {
            data.push(this.transform(employeeleavelogs[i]));
        }
        return data;
    }

};