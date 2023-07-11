
module.exports = {
    // single transformation
    transform(employeeform) {
        return {
            'id': employeeform.id,
            //'employee_id':employeeresource.transform(employeeform.employee),
            //'form_id':formsresource.transform(employeeform.form),
            'status': employeeform.status,
            'created': employeeform.created,
            'updated': employeeform.updated
        };
    },

    //
    transformCollection(employeeforms) {
        employeeforms = typeof employeeforms === "object" ? employeeforms : [];
        var data = [];
        for (var i = 0; i < employeeforms?.length; i++) {
            data.push(this.transform(employeeforms[i]));
        }
        return data;
    }

};