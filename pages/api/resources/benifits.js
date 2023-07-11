module.exports = {
    transform(benifit) {
        if(benifit && typeof benifit === "object"){
        return {
            'id': benifit.id,
            'name': benifit.name,   
        };
    }
    return{};
    },
    transformCollection(benifits) {
        benifits = typeof benifits === "object" ? benifits : [];
        var data = [];
        for (var i = 0; i < benifits?.length; i++) {
            data.push(this.transform(benifits[i]));
        }
        return data;
    }
};