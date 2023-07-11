module.exports = {
    transform(department) {
        return {
            'id': department.id,
            'name': department.name,
            'code': department.code,
            'description': department.description,
            'status': department.status,
            'Rmanager':department.rms_employees_department
        };
    },

    transformCollection(departments) {
        departments = typeof departments === "object" ? departments : [];
        let data = [];
        for (let i = 0; i < departments?.length; i++) {
            data.push(this.transform(departments[i]));
        }
        return data;
    }

};