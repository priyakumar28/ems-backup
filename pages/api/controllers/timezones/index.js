const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, BAD_REQUEST
} = require('../../config/status_codes');
import { response } from "../../helpers";
const { timezones_service } = require('../../services/Timezones');
const {
    create: createTimezonesSchema,
    update: updateTimezonesSchema,
    getById: getByIdTimezonesSchema,
    delete: deleteTimezonesSchema
} = require('../../validations/timezones');

const requireAuth = require('../../middlewares/_requireAuth');

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
            result = response(BAD_REQUEST, `Method ${method} Not Allowed`);
    }
    return res.json(result);
});

/**
 * Get all timezone records and send as response.
 * @public
 */
const getById = async (id) => {
    try {
        const { error } = getByIdTimezonesSchema.query.validate({ id });
        if (error) {
            const { details } = error;
            const message = details
                .map((i) => i.message.replace(/\"/g, ""))
                .join(",");
            return response(UNPROCESSABLE_ENTITY, message);
        }

        return await timezones_service.getById(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
/**
 * Create new timezone record
 * 
 * @public
 */
const create = async (payload) => {
    try {
        const { error } = createTimezonesSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await timezones_service.create(payload);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const update = async (payload, id) => {
    try {
        const { error } = updateTimezonesSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await timezones_service.update(id, payload);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Get timezone records list
 * @public
 */
const list = async () => {
    try {
        return await timezones_service.list()
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Delete timezone record
 * @public
 */
const remove = async (id) => {
    try {
        const { error } = deleteTimezonesSchema.query.validate({ id });
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await timezones_service.remove(req.query.id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};  
