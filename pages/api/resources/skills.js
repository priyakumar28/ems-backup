module.exports = {
    // single transformation
    transform(skill) {
    if (dataimport && typeof dataimport === 'object'){
        return {
            'id': skill.id,
            'name': skill.name,
            'description': skill.description
            };
        }
        return{}
    },

    transformCollection(skills) {
        var data = [];
        for (var i = 0; i < skills.length; i++) {
            data.push(this.transform(skills[i]));
        }
        return data;
    }

};