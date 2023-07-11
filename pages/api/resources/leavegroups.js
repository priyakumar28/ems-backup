module.exports = {
    transform(leavegroup) {
        return {
            'id': leavegroup.id,
            'name': leavegroup.name,
            'details': leavegroup.details,
            'createdOn': leavegroup.created,
            'updatedOn': leavegroup.updated
        };
    },

    transformCollection(leavegroups) {
        leavegroups = typeof leavegroups === "object" ? leavegroups : [];
        var data = [];
        for (var i = 0; i < leavegroups?.length; i++) {
            data.push(this.transform(leavegroups[i]));
        }
        return data;
    }

};