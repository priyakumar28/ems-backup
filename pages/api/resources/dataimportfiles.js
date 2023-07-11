module.exports = {
    // single transformation
    transform(dataimportfile) {
    if (dataimportfile && typeof dataimportfile === 'object'){
        return {
            'id':dataimportfile.id,
            'name': dataimportfile.name,
            'data_import_definition': dataimportfile.data_import_definition,
            'status': dataimportfile.status,
            'file': dataimportfile.file,
            'details': dataimportfile.details,
            'created': dataimportfile.created,
            'updated': dataimportfile.updated
            
            };
        }
        return{};
    },

    transformCollection(dataimportfiles) {
        var data = [];
        for (var i = 0; i < dataimportfiles.length; i++) {
            data.push(this.transform(dataimportfiles[i]));
        }
        return data;
    }

};