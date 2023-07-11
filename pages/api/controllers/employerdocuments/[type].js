const { OK, INTERNAL_SERVER_ERROR, UNAUTHORIZED } = require('../../config/status_codes');
const requireAuth = require('../../middlewares/_requireAuth');
const basic = require('../../services/user/users');
const { response } = require('../../helpers');

export const config = {
    api: {
        bodyParser: false,
    },
};

export default requireAuth(async (req, res) => {
    const {
        query: { type },
        user,
    } = req;

    let result = response(UNAUTHORIZED, "Unauthorized to access this service");
    switch (type) {
        case "getbyUserLevel":
            result = await getbyUserLevel();
            break;
        case "checkUserAvailability":
            let { data } = await getbyUserLevel();
            result = { success: true, message: "User available", data: user, admins: data };
            break;
        case "currentUserUpdate":
            result = await currentUserUpdate(req, user);
            break;
        default:
            result = { success: false, message: "Invalid request" };
    }
    return res.json(result);
});

const currentUserUpdate = async (req, user) => {
    try {
        return await basic.update(req, user.id, req.query.update_type);
    } catch (error) {
        return { code: INTERNAL_SERVER_ERROR, message: error.message };
    }
};

export const getbyUserLevel = async () => {
    try {
        return await basic.getbyUserLevel();
    } catch (error) {
        return { code: INTERNAL_SERVER_ERROR, message: error.message };
    }
};
