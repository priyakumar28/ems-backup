module.exports = {
    // single transformation
    transform(permission) {
        if(permission && typeof permission === "object"){
            return permission?.dataValues?.permission || permission?.dataValues?.permissions;
        }
        return {};        
    },

    //
    transformCollection(permissions) {
        var data = [];
        for (var i = 0; i < permissions?.length; i++) {
            data.push(this.transform(permissions[i]));
        }
        return data;
    }

};