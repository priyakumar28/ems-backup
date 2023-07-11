const { OK, INTERNAL_SERVER_ERROR, UNAUTHORIZED } = require('../../config/status_codes');
const { basic } = require('../../services/dashboardData');


const requireAuth = require('../../middlewares/_requireAuth');

const { response } = require('../../helpers');
export default requireAuth(async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    let result = response(UNAUTHORIZED, "Unauthorized to access this service");

    switch (method) {
        case "GET":
            if (id) {
                result = await getById(req.query.id, req.user);
            } else {
                result = await list();
            }
            break;
        default:
            res.setHeader("Allow", ["GET"]);
            result = response(false, `Method ${method} Not Allowed`);
    }
    return res.json(result);
})


const list = async () => {
    try {
        return await basic.list();
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};
