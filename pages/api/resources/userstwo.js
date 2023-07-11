const userrolesResource = require('./userroles');


module.exports = {
    // single transformation
    transform(user) {
        if (user && typeof user === "object") {
            return {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'user_level': user.user_level,
                'last_login': user.last_login,
                'last_update': user.last_update,
                'lang': user.lang,
                'created': user.created
                    ? moment(user.created).format("DD-MMM-YYYY")
                    : null,
                'profile_pic': user.profile_pic,
                'roles': user.users_userroles ? userrolesResource.transformCollection(user.users_userroles) : {},
            }
        }
        return {};
    },

    //
    transformCollection(users) {
        users = typeof users === "object" ? users : [];
        let data = [];
        for (const element of users) {
            data.push(this.transform(element));
        }
        return data;
    }

};