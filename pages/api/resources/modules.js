const permissionsResource = require('./permissions');

module.exports = {
    transform(module, role_id) {
        if (module && typeof module === "object") {
            return {
                'id': module.id,
                'name': module.name,
                'menu': module.menu,
                'label': module.label,
                'mod_order': module.mod_order,
                'created_at': module.userrolemodules?.createdAt,
                'permissions': permissionsResource.transform(module.modules_permissions?.find(x => x.module_id == module.id && x.user_role == role_id))
            }
        }
        return {};
    },

    //
    transformCollection(modules, role_id) {
        modules = typeof modules === "object" ? modules : [];
        var data = [];
        for (var i = 0; i < modules?.length; i++) {
            data.push(this.transform(modules[i], role_id));
        }
        return data;
    }

};