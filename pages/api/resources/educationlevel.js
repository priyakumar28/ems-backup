
module.exports = {
    //single transformation
    transform(educationlevel) {
        if (educationlevel && typeof educationlevel === "object") {
            return {
                'id': educationlevel.id,
                'name': educationlevel.name
            };
        }
        return {};
    },
    //
    transformCollection(educationlevel) {
        educationlevel = typeof educationlevel === "object" ? educationlevel : [];
        var data = [];
        for (var i = 0; i < educationlevel.length; i++) {
            data.push(this.transform(educationlevel[i]));
        }
        return data;
    }
};