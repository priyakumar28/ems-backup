const modulesResource = require('./modules');

module.exports = {
    // single transformation
    transform(userrole) {
        if (userrole && typeof userrole === "object") {
            return {
                'id': userrole.id,
                'name': userrole.name,
                'created_at': userrole.usersroles?.createdAt,
                'allocatedModules': modulesResource.transformCollection(userrole.userroles_assignmodules, userrole.id),
                'modules': modulesResource.transformCollection(userrole.userroles_modules, userrole.id)
            }
        }
        return {};
    },

    //
    transformCollection(userroles) {
        userroles = typeof userroles === "object" ? userroles : [];
        var data = [];
        for (var i = 0; i < userroles?.length; i++) {
            data.push(this.transform(userroles[i]));
        }
        return data;
    }

};