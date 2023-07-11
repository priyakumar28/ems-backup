

module.exports = {
    // single transformation
    transform(employeeimmigration) {
        if (employeeimmigration && typeof employeeimmigration === "object") {
        return {
            'id': employeeimmigration.id,
            //'employee':employeeresource.transform(employeeimmigration.employee_employee),
           // 'document':immigrationdocumentsresource.transform(employeeimmigration.document_immigrationdocument),
            'documentname': employeeimmigration.documentname,
            'valid_until': employeeimmigration.valid_until,
            'status': employeeimmigration.status,
            'details':employeeimmigration.details,
            'attachment1':employeeimmigration.attachment1,
            'attachment2':employeeimmigration.attachment2,
            'attachment3':employeeimmigration.attachment3,
            'created':employeeimmigration.created,
            'updated':employeeimmigration.updated,
            
        };
    }
        return{}
    },

    //
    transformCollection(employeeimmigrations) {
        employeeimmigrations = typeof employeeimmigrations === "object" ? employeeimmigrations : [];
        var data = [];
        for (var i = 0; i < employeeimmigrations?.length; i++) {
            data.push(this.transform(employeeimmigrations[i]));
        }
        return data;
    }

};