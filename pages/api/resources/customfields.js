module.exports = {
    // single transformation
    transform(customfield) {
        return {    
            'id':customfield.id,
            'type':customfield.type,
            'name':customfield.name,
            'data':customfield.data,
            'display':customfield.display
          };
    },

    //
    transformCollection(customfields) {
        customfields = typeof customfields === "object" ? customfields : [];
        var data = [];
        for (var i = 0; i < customfields?.length; i++) {
            data.push(this.transform(customfields[i]));
        }
        return data;
    }

};