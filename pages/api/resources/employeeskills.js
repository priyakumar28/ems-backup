const { isValidURL } = require('../../../lib/helpers');

module.exports = {
    transform(employeeskill) {
        if (employeeskill && typeof employeeskill === "object") {
            return {
                'id': employeeskill.id,
                'skill_name': employeeskill.skill_name,
                'is_certified': employeeskill.is_certified,
                'attachment': isValidURL(employeeskill.attachment) ? employeeskill.attachment : false,
                'date_start': employeeskill.date_start,
                'date_end': employeeskill.date_end,
                'details': employeeskill.details
            }
        }
        return {};
    },

    transformCollection(employeeskills) {
        employeeskills = typeof employeeskills === "object" ? employeeskills : [];
        var data = [];
        for (var i = 0; i < employeeskills?.length; i++) {
            data.push(this.transform(employeeskills[i]));
        }
        return data;
    }

};