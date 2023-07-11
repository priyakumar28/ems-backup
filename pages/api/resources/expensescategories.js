
module.exports = {
    // single transformation
    transform(expensescategories) {
        if (expensescategories && typeof expensescategories === "object") {

            return {
                'id': expensescategories.id,
                'name': expensescategories.name,
                'created': expensescategories.created,
                'updated': expensescategories.updated,
                'pre_approve': expensescategories.pre_approve,
            };
        }
        return {};
    },

    //
    transformCollection(expensescategories) {
        expensescategories = typeof expensescategories === "object" ? expensescategories : [];
        var data = [];
        for (var i = 0; i < expensescategories.length; i++) {
            data.push(this.transform(expensescategories[i]));
        }
        return data;
    }

};