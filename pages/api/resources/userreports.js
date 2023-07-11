module.exports = {
    transform(userreport) {
        return {
            'id': userreport.id,
            'name': userreport.name,
            'details': userreport.details,
            'parameters': userreport.userreport_level,
            'query': userreport.query,
            'last_update': userreport.last_update,
            'paramorder': userreport.paramorder,
            'type': userreport.type,
            'report_group': userreport.report_group,
            'output': userreport.output
        };
    },

    transformCollection(userreports) {
        userreports = typeof userreports === "object" ? userreports : [];
        var data = [];
        for (var i = 0; i < userreports?.length; i++) {
            data.push(this.transform(userreports[i]));
        }
        return data;
    }

};