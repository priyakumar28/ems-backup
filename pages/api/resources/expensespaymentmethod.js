module.exports = {
    // single transformation
    transform(expensespaymentmethod) {
        if (expensespaymentmethod && typeof expensespaymentmethod === "object") {

            return {
                'id': expensespaymentmethod.id,
                'name': expensespaymentmethod.name,
                'created': expensespaymentmethod.created,
                'updated': expensespaymentmethod.updated
            };
        }
        return {};
    },

    //
    transformCollection(expensespaymentmethods) {
        expensespaymentmethods = typeof expensespaymentmethods === "object" ? expensespaymentmethods : [];
        var data = [];
        for (var i = 0; i < expensespaymentmethods.length; i++) {
            data.push(this.transform(expensespaymentmethods[i]));
        }
        return data;
    }

};