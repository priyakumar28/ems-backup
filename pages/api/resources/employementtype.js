module.exports = {
    //single transformation
    transform(employementtype) {
        if (employementtype && typeof employementtype === "object") {
            return {
                'id': employementtype.id,
                'name': employementtype.name
            };
        }
        return {};
    },
    //
    transformCollection(employementtype) {
        employementtype = typeof employementtype === "object" ? employementtype : [];
        var data = [];
        for (var i = 0; i < employementtype.length; i++) {
            data.push(this.transform(employementtype[i]));
        }
        return data;
    }
};