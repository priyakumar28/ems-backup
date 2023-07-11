const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY,UNAUTHORIZED, METHOD_NOT_ALLOWED } = require('../../config/status_codes');
const basic = require('../../services/user/modules');
const requireAuth = require('../../middlewares/_requireAuth');
import { response } from "../../helpers";
const {
    getById: getModuleSchema,
    list: getAllModuleSchema,
    create: createModuleSchema,
    update: updateModuleSchema,
    remove: removeModuleSchema
} = require('../../validations/modules');


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
            result = await update(req.body, req.query.id, req.query.update_type);
            break;
        case "DELETE":
            result = await remove(req.query.id);
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
            result = response(METHOD_NOT_ALLOWED, `Method ${method} Not Allowed`);
    }
    return res.json(result);
});


export const cant = (err, res) => {
    const { details } = err;
    const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
    return response(UNPROCESSABLE_ENTITY, message);
}

export const getById = async (id) => {
    try {
        const { error } = getModuleSchema.query.validate({ id });
        if (error) {

            return cant(error);
        }
        return basic.getById(id);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


export const create = async (payload) => {
    try {
        const { error } = createModuleSchema.body.validate(payload);
        if (error) {
            return cant(error);
        }
        return await basic.create(payload);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


export const update = async (payload, id, update_type) => {
    try {
        const { error } = updateModuleSchema.query.validate({ id });
        if (error) {
            return cant(error);
        }
        const { error2 } = updateModuleSchema.body.validate(payload);
        if (error2) {
            return cant(error2);
        }
        return await basic.update(payload, id, update_type);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

export const list = async () => {
    try {
        return await basic.list();
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


export const remove = async (id) => {
    try {
        const { error } = removeModuleSchema.query.validate({ id });
        if (error) {
            return cant(error);
        }
        return await basic.remove(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

