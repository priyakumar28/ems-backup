const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY
} = require('../../config/status_codes');
import { response } from "../../helpers";
const { statuschangelogs_service } = require('../../services/Statuschangelogs');
const {
    create: createStatusChangelogsSchema,
    update: updateTimezonesSchema,
    getById: getByIdStatusChangelogsSchema,
    delete: deleteStatusChangelogsSchema
} = require('../../validations/statuschangelogs');

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
            result = response(false, `Method ${method} Not Allowed`);
    }
    return res.json(result);
});

/**
 * Get all statuschangelogs record and send as response.
 * @public
 */
const getById = async (id) => {
    try {
        const { error } = getByIdStatusChangelogsSchema.query.validate({ id });
        if (error) {
            const { details } = error;
            const message = details
                .map((i) => i.message.replace(/\"/g, ""))
                .join(",");
            return response(UNPROCESSABLE_ENTITY, message);
        }

        return await statuschangelogs_service.getById(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
/**
 * Create new statuschangelog record
 * 
 * @public
 */
const create = async (payload) => {
    try {
        const { error } = createStatusChangelogsSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await statuschangelogs_service.create(payload);
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
        return await statuschangelogs_service.update(id, payload);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Get statuschangelogs record list
 * @public
 */
const list = async () => {
    try {
        return await statuschangelogs_service.list()
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Delete statuschangelog record
 * @public
 */
const remove = async (id) => {
    try {
        const { error } = deleteStatusChangelogsSchema.query.validate({id});
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await statuschangelogs_service.remove(req.query.id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};  
