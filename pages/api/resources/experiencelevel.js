module.exports = {
    // single transformation
    transform(experiencelevel) {
        if (experiencelevel && typeof experiencelevel=== "object"){
        return {
            id : experiencelevel.id,
            name: experiencelevel.name
        };
    }
    return{};
},
    
    transformCollection(experiencelevels) {
        experiencelevels = typeof experiencelevels === "object" ? experiencelevels : [];
        var data = [];
        for (var i=0; i<experiencelevels?.length; i++) {
            data.push(this.transform(experiencelevels[i]));
        }
        return data;
    }
};