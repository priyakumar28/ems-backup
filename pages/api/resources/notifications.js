

module.exports = {
    // single transformation
    transform(notification) {
        if ( notification && typeof notification === "object") {
        return {
            'id' : notification.id,
            'time' : notification.time,
            'fromuser' : notification.fromuser,
            'fromemployee' : notification.fromemployee,
            'touser' : notification.touser_user,
            'image' : notification.image,
            'message' : notification.message,
            'action' : notification.action,
            'type' : notification.type,
            'status' : notification.status,
            'employee' : notification.employee
        };
    }
    return {};
    },

    transformCollection(notifications) {
        notifications = typeof notifications === "object" ? notifications : [];
        var data = [];
        for (var i=0; i<notifications?.length; i++) {
            data.push(this.transform(notifications[i]));
        }
        return data;
    }
};