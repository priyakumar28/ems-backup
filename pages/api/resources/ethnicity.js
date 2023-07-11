module.exports = {
    // single transformation
    transform(ethnicity) {
        if (ethnicity && typeof ethnicity === "object") {

            return {
                'id': ethnicity.id,
                'name': ethnicity.name

            };
        }
        return {};
    },

    //
    transformCollection(ethnicitys) {
        ethnicitys = typeof ethnicitys === "object" ? ethnicitys : [];
        var data = [];
        for (var i = 0; i < ethnicitys.length; i++) {
            data.push(this.transform(ethnicitys[i]));
        }
        return data;
    }

};