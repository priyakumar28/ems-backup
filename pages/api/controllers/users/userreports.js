const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, METHOD_NOT_ALLOWED } = require('../../config/status_codes');
const basic = require('../../services/user/userreports');
const requireAuth = require('../../middlewares/_requireAuth');
import { response } from "../../helpers";
const {
    getById: getUserreportSchema,
    list: getAllUserreportSchema,
    create: createUserreportSchema,
    update: updateUserreportSchema,
    remove: removeUserreportSchema
} = require('../../validations/userreports');

export default requireAuth(async (req, res) => {
    const {
        query: {
            id
        },
        method
    } = req;

    let result = response(METHOD_NOT_ALLOWED, `Method ${method} Not Allowed`);;
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
            result = response(METHOD_NOT_ALLOWED, `Method ${method} Not Allowed`);
    }
    return res.json(result);
});

export const cant = (err,res) => {
    const { details } = err;
    const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
    return response(UNPROCESSABLE_ENTITY, message);
}

export const getById = async (id) => {
    try {
        const { error } = getUserreportSchema.query.validate({ id });
        if (error) {
            return cant(error,res);
        } 
        return await basic.getById(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


export const create = async (payload) => {
    try {
        const { error } = createUserreportSchema.body.validate(payload);
        if (error) {
            return cant(error,res);
        }
        return await basic.create(payload);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


export const update = async (payload, id) => {
    try {
        const { error } = updateUserreportSchema.query.validate({ id });
        if (error) {
            return cant(error,res);
        }
        const { error2 } = updateUserreportSchema.body.validate(payload);
        if (error2) {
            return cant(error2);
        }
        return await basic.update(payload, id);
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
        const { error } = removeUserreportSchema.query.validate({ id });
        if (error) {
            return cant(error, res);
        }
        return await basic.remove(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
