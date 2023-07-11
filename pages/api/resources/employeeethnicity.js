const empethResource = require('../resources/ethnicity');
module.exports = {
    // single transformation
    transform(employeeethnicity) {
        if (employeeethnicity && typeof employeeethnicity === "object") {

            return {
                'id': employeeethnicity.id,
                'employee': employeeethnicity.employee_employee,
                //  'ethnicity':employeeethnicity.ethnicity_ethnicity,
                'ethnicity': empethResource.transform(employeeethnicity.ethnicity_ethnicity)
            };
        }
        return {};
    },

    //
    transformCollection(employeeethnicitys) {
        employeeethnicitys = typeof employeeethnicitys === "object" ? employeeethnicitys : [];
        var data = [];
        for (var i = 0; i < employeeethnicitys.length; i++) {
            data.push(this.transform(employeeethnicitys[i]));
        }
        return data;
    }

};