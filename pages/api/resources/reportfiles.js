

module.exports = {
    // single transformation
    transform(reportfile) {
        if (reportfile && typeof reportfile === "object") {
        return {
            'id': reportfile.id,
            'employee': reportfile.employee,
            'name': reportfile.name,
            'attachment': reportfile.attachment,
            'created': reportfile.created
        };
    }
    return {};
},
    //
    transformCollection(reportfiles) {
        reportfiles = typeof reportfiles === "object" ? reportfiles : [];
        var data = [];
        for (var i = 0; i < reportfiles?.length; i++) {
            data.push(this.transform(reportfiles[i]));
        }
        return data;
    }

};