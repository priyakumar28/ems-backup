module.exports = {
    // single transformation
    transform(education) {
        if (education && typeof education === "object") {
            return {
                'id': education.id,
                'name': education.name,
                'description': education.description
            };
        }
        return {};
    },


    //
    transformCollection(educations) {
        educations = typeof educations === "object" ? educations : [];
        var data = [];
        for (var i = 0; i < educations.length; i++) {
            data.push(this.transform(educations[i]));
        }
        return data;
    }

};