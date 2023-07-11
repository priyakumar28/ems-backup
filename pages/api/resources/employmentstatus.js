module.exports = {
    transform(employmentstatus) {
        if(employmentstatus && typeof employmentstatus === "object"){
        return {
            'id': employmentstatus.id,
            'name': employmentstatus.name,
            'description': employmentstatus.description, 
        };
    }
    return{};
    },
    transformCollection(employmentstatuses) {
        employmentstatuses = typeof employmentstatuses === "object" ? employmentstatuses : [];
        var data = [];
        for (var i = 0; i < employmentstatuses.length; i++) {
            data.push(this.transform(employmentstatuses[i]));
        }
        return data;
    }

};