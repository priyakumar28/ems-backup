module.exports = {
    transform(employerdocument) {
        if (employerdocument && typeof employerdocument === "object") {
            let {
                id, employee_id, first_name, middle_name, last_name, work_email, joined_date, status, profile_pic
            } = employerdocument.employer_document_employees;
            return {
                'id': employerdocument.id,
                'name': employerdocument.name,
                'date_added': employerdocument.date_added,
                'approval_status': employerdocument.approval_status,
                'details': employerdocument.details,
                'level': employerdocument.level,
                'doc_type': employerdocument.doc_type,
                'employee': {
                    'id': id,
                    'code': employee_id,
                    'name': first_name + (typeof middle_name == 'string' ? (middle_name + ' ') : ' ') + last_name,
                    'email': work_email,
                    'joined_date': joined_date,
                    'status': status,
                    'profile_pic': profile_pic
                }
            };
        }
        return {};
    },

    transformCollection(employerdocuments) {
        employerdocuments = typeof employerdocuments === "object" ? employerdocuments : [];
        let data = [];
        for (let i = 0; i < employerdocuments?.length; i++) {
            data.push(this.transform(employerdocuments[i]));
        }
        return data;
    }
};


