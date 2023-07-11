module.exports = {
    transform(jobfunction) {
        if(jobfunction && typeof jobfunction === "object"){
        return {
            'id': jobfunction.id,
            'name': jobfunction.name,
        };
    }
    return{};
    },
    transformCollection(jobfunctions) {
        jobfunctions = typeof jobfunctions === "object" ? jobfunctions : [];
        var data = [];
        for (var i = 0; i < jobfunctions?.length; i++) {
            data.push(this.transform(jobfunctions[i]));
        }
        return data;
    }

};
