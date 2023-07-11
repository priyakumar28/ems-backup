const userResource = require('./users')
module.exports = {
    transform(auditlog) {
        if(auditlog && typeof auditlog === "object"){
        return {
            'id': auditlog.id,
            'time': auditlog.time,
            'user_id': userResource.transform(auditlog.user),
            'ip': auditlog.ip,
            'type': auditlog.type,
            'employee': auditlog.employee,
            'details': auditlog.details, 
        };
    }
        return{};
    },
    transformCollection(auditlogs) {
        auditlogs = typeof auditlogs === "object" ? auditlogs : [];
        var data = [];
        for (var i = 0; i < auditlogs?.length; i++) {
            data.push(this.transform(auditlogs[i]));
        }
        return data;
    }

};