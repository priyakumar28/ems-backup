

module.exports = {
    // single transformation
    transform(a_employee) {
        return {
            'id': a_employee.id,
            'ref_id': a_employee.id,
            'employee_id': a_employee.employee_id,
            'first_name':  a_employee.id,
            'last_name':a_employee.last_name,
            'gender': a_employee.gender,
            "ssn_num": a_employee.ssn_num,
            "nic_num":a_employee.nic_num,
            "other_id":a_employee.other_id,
            "work_email":a_employee.work_email,
            "joined_date":a_employee.joined_date,
            "confirmation_date":a_employee.confirmation_date,
            "supervisor": a_employee.supervisor,
            "department": a_employee.department,
            "termination_date": a_employee.termination_date,
            "notes": a_employee.notes,
            "data": a_employee.data
        };
    },

    //
    transformCollection(a_employees) {
        a_employees = typeof a_employees === "object" ? a_employees : [];
        var data = [];
        for (var i = 0; i < a_employees?.length; i++) {
            data.push(this.transform(a_employees[i]));
        }
        return data;
    }

};