module.exports = {
    // single transformation
    transform(customfieldvalue) {
        return {    
            'id':customfieldvalue.id,
            'type':customfieldvalue.type,
            'name':customfieldvalue.name,
            'object_id':customfieldvalue.object_id,
            'value':customfieldvalue.value
          };
    },

    //
    transformCollection(customfieldvalues) {
        customfieldvalues = typeof customfieldvalues === "object" ? customfieldvalues : [];
        var data = [];
        for (var i = 0; i < customfieldvalues?.length; i++) {
            data.push(this.transform(customfieldvalues[i]));
        }
        return data;
    }

};