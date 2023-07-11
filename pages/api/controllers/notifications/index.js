const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const { basic } = require('../../services/notifications');
const requireAuth = require('../../middlewares/_requireAuth');
import { response } from "../../helpers";

const {
    getById: getNotificationsSchema,
    create: createNotificationsSchema,
    update: updateNotificationsSchema,
    list: listNotificationsSchema,
    remove: deleteNotificationsSchema
} = require('../../validations/notifications');

export default requireAuth(async (req, res) => {
    const {
        query: {
            id
        },
        method
    } = req;

    let result = response(UNAUTHORIZED, "Unauthorized to access this service");
    switch (method) {
        case "GET":
            if (id) {
                result = await getById(req.query.id);
            } else {
                result = await list();
            }
            break;
        case "POST":
            result = await create(req.body);
            break;
        case "PUT":
            result = await update(req.body, req.query.id);
            break;
        case "DELETE":
            result = await remove(req.query.id);
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
            result = response(false, `Method ${method} Not Allowed`);
    }
    return res.json(result);
});

const getById = async (id) => {
    try {
        const { error } = getNotificationsSchema.query.validate({ id });

        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await basic.getById(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const create = async (payload) => {
    try {
        const { error } = createNotificationsSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);

        }
        return await basic.create(payload);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const update = async (payload, id) => {
    try {
        const { error } = updateNotificationsSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await basic.update(payload, id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const list = async () => {
    try {
        return await basic.list();
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const remove = async (id) => {
    try {
        const { error } = deleteNotificationsSchema.query.validate();
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await basic.remove(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

