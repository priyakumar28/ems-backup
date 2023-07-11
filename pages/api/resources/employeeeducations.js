module.exports = {
    transform(employeeeducation) {
        if (employeeeducation && typeof employeeeducation === "object") {
            return {
                'id': employeeeducation.id,
                'education_name': employeeeducation.education_name,
                'institute': employeeeducation.institute,
                'date_start': employeeeducation.date_start,
                'date_end': employeeeducation.date_end,
                'employee': employeeeducation.employee_employee,
                'attachment': employeeeducation.attachment ? employeeeducation.attachment : []
            }
        }
        return {};

    },

    transformCollection(employeeeducations) {
        employeeeducations = typeof employeeeducations === "object" ? employeeeducations : [];
        var data = [];
        for (var i = 0; i < employeeeducations?.length; i++) {
            data.push(this.transform(employeeeducations[i]));
        }
        return data;
    }

};