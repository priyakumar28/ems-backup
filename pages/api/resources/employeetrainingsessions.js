const trainingsessionsResources = require('./trainingsessions');
// const employeeResources = require('./employees');

module.exports = {
    transform(employeetrainingsessions) {
        if (employeetrainingsessions && typeof employeetrainingsessions === "object") {
            employeetrainingsessions = employeetrainingsessions.dataValues;
            return {
                'id': employeetrainingsessions.id,
                'trainingsession': trainingsessionsResources.transform(employeetrainingsessions.trainingsession_trainingsession),
                'feedback': employeetrainingsessions.feedback,
                'status': employeetrainingsessions.status,
                // 'employee': employeeResources.transform(employeetrainingsessions.employee_employee)
            }
        }
        return {};
    },

    transformCollection(employeetrainingsessions) {
        employeetrainingsessions = typeof employeetrainingsessions === 'object' ? employeetrainingsessions : [];
        let data = [];
        for (var i = 0; i < employeetrainingsessions.length; i++) {
            data.push(this.transform(employeetrainingsessions[i]));
        }
        return data;
    }

};
