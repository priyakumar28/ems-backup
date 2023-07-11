const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const { reports } = require('../../services/reports');
const requireAuth = require('../../middlewares/_requireAuth');
import { response } from "../../helpers";
const {
    getById: reportsGetByIdDocumentSchema,
    create: createReportsDocumentSchema,
    update: updateReportsDocumentSchema,
    list: listReportsDocumentSchema,
    delete: deleteReportsDocumentSchema
} = require('../../validations/reports');

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
                result = await getById(req, res);
            } else {
                result = await list(req, res);
            }
            break;
        case "POST":
            result = await create(req.body);
            break;
        case "PUT":
            result = await update(req.body, req.query.id);
            break;
        case "DELETE":
            result = await remove(req, res);
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
            result = response(false, `Method ${method} Not Allowed`);
    }
    return res.json(result);
});


export const getById = async (req, res) => {
    try {

        return await reports.getById(req.query.id)
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

export const create = async (payload) => {
    try {
        const { error } = createReportsDocumentSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await reports.create(payload);

    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};






export const update = async (payload, id) => {
    try {
        const { error } = updateReportsDocumentSchema.body.validate(payload);

        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await reports.update(payload, id);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


export const list = async (_req, res) => {
    try {
        return await reports.list()
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


export const remove = async (req, res) => {
    try {
        return await reports.remove(req.query.id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};



