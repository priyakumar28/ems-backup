module.exports = {
    // single transformation
    transform(fieldnamemappings) {
        if (fieldnamemappings && typeof fieldnamemappings === "object") {
            return {
                'id': fieldnamemappings.id,
                'type': fieldnamemappings.type,
                'name': fieldnamemappings.name,
                'textorig': fieldnamemappings.textorig,
                'textmapped': fieldnamemappings.textmapped,
                'display': fieldnamemappings.display,
                'created': fieldnamemappings.created,
                'updated': fieldnamemappings.updated,
            };
        }
        return {};
    },

    //
    transformCollection(fieldnamemappingss) {
        fieldnamemappingss = typeof fieldnamemappingss === "object" ? fieldnamemappingss : [];
        var data = [];
        for (var i = 0; i < fieldnamemappingss.length; i++) {
            data.push(this.transform(fieldnamemappingss[i]));
        }
        return data;
    }

};