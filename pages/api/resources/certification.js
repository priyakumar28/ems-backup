module.exports = {
    // single transformation
    transform(certification) {
        if (certification && typeof certification === "object") {
            return {
                'id': certification.id,
                'name': certification.name,
                'description': certification.description
            };
        }
        return {};
    },


    //
    transformCollection(certifications) {
        certifications = typeof certifications === "object" ? certifications : [];
        var data = [];
        for (var i = 0; i < certifications.length; i++) {
            data.push(this.transform(certifications[i]));
        }
        return data;
    }

};