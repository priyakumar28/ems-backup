module.exports = {
    transform(userreport) {
        return {
            'id': userreport.id,
            'name': userreport.name,
            'startdate': userreport.date_start,
            'enddate': userreport.date_end,
            'status': userreport.status
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