module.exports = {
    // single transformation
    transform(industry) {
        if ( industry && typeof industry === "object"){
        return {
            'id': industry.id,
            'name': industry.name
        };
    }
    return {};
},
    
    transformCollection(industrys) {
        industrys = typeof industrys === "object" ? industrys : [];
        var data = [];
        for (var i=0; i<industrys?.length; i++){
            data.push(this.transform(industrys[i]));
        }
        return data;
    }
};
