module.exports = {
    transform(employeecertification) {
        if (employeecertification && typeof employeecertification === "object") {
            return {
                'id': employeecertification.id,
                'certification_name': employeecertification.certification_name,
                'institute': employeecertification.institute,
                'date_start': employeecertification.date_start,
                'date_end': employeecertification.date_end
            }
        }
        return {};

    },

    transformCollection(employeecertifications) {
        employeecertifications = typeof employeecertifications === "object" ? employeecertifications : [];
        var data = [];
        for (var i = 0; i < employeecertifications?.length; i++) {
            data.push(this.transform(employeecertifications[i]));
        }
        return data;
    }

};