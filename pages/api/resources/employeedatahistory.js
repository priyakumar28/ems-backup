const employeeResources = require('./employees');
const userResources = require('./users');

module.exports = {
    // single transformation
    transform(employeedatahistorys) {
    if (employeedatahistorys && typeof employeedatahistorys === 'object'){
        return {
            'id': employeedatahistorys.id,
            'type': employeedatahistorys.type,
            'field': employeedatahistorys.field,
            'old_value': employeedatahistorys.old_value,
            'new_value': employeedatahistorys.new_value,
            'description': employeedatahistorys.description,
            'updated': employeedatahistorys.updated,
            'created': employeedatahistorys.created,
            'employee': employeeResources.transform(employeedatahistorys.employee),
            'user': userResources.transform(employeedatahistorys.user),
            };
        }
        return{};
    },

    transformCollection(employeedatahistories) {
        employeedatahistories = typeof employeedatahistories === "object" ? employeedatahistories : [];
        var data = [];
        for (var i = 0; i < employeedatahistories?.length; i++) {
            data.push(this.transform(employeedatahistories[i]));
        }
        return data;
    }

};