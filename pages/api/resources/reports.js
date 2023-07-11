

module.exports = {
    // single transformation
    transform(report) {
        if (report && typeof report === "object") {
        return {
            'id': report.id,
            'name': report.name,
            'details': report.details,
            'parameters': report.parameters,
            'query': report.query,
            'paramorder': report.paramorder,
            'type': report.type,
            'report_group': report.report_group,
            'output': report.output
        }
    }
    return {};
},

    //
    transformCollection(reports) {
        reports = typeof reports === "object" ? reports : [];
        var data = [];
        for (var i = 0; i < reports?.length; i++) {
            data.push(this.transform(reports[i]));
        }
        return data;
    }

};