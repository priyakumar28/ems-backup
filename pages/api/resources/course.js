
module.exports = {
    // single transformation
    transform(course) {
        if (course && typeof course === "object") {
            return {
                'id': course.id,
                'code': course.code,
                'name': course.name,
                'description': course.description,
                'coordinator': course.coordinator_employee?.work_email,
                'trainer': course.trainer,
                'contact_number': course.contact_number,
                'contact_mail':course.contact_mail,
                'trainer_from': course.trainer_from,
                'trainer_info': course.trainer_info,
                'paymenttype': course.paymenttype,
                'cost': course.cost,
                'cost_code': course.cost_code,
                'status': course.status,
                'employee': course.coordinator_employee
            };
        }
        return {};
    },

    //
    transformCollection(courses) {
        courses = typeof courses === "object" ? courses : [];
        var data = [];
        for (var i = 0; i < courses.length; i++) {
            data.push(this.transform(courses[i]));
        }
        return data;
    }

};