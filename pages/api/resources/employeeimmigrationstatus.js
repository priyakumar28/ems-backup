

module.exports = {
    // single transformation
    transform(employeeimmigrationstatus) {
        if (employeeimmigrationstatus && typeof employeeimmigrationstatus === "object") {
        return {
            'id': employeeimmigrationstatus.id,
           // 'employee':employeeresource.transform(employeeimmigrationstatus.employee_employee),
            //'status':immigrationstatusresource.transform(employeeimmigrationstatus.status_immigrationstatus)
          
            
        };
    }
    return{}
    },

    //
    transformCollection(employeeimmigrationstatuss) {
        employeeimmigrationstatuss = typeof employeeimmigrationstatuss === "object" ? employeeimmigrationstatuss : [];
        var data = [];
        for (var i = 0; i < employeeimmigrationstatuss?.length; i++) {
            data.push(this.transform(employeeimmigrationstatuss[i]));
        }
        return data;
    }

};