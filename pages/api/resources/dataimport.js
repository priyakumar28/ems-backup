module.exports = {
    // single transformation
    transform(dataimport) {
    if (dataimport && typeof dataimport === 'object'){
        return {
            'name':dataimport.name,
            'datatype':dataimport.datatype,
            'details':dataimport.details,
            'columns':dataimport.columns,
            'updated':dataimport.updated,
            'created':dataimport.created
            };
        }
        return{};
    },
    
    transformCollection(dataimports){
    
    var data = [];
    for (var i=0; i<dataimports?.length; i++){
                data.push(this.transform(dataimports[i]));
            }
    return data;
        }
    }