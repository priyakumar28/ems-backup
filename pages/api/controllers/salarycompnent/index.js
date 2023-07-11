const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const { salarycomponent_service } = require('../../services/Salarycomponent');
const requireAuth = require('../../middlewares/_requireAuth');
import { ResourceStore } from "i18next";
import { response } from "../../helpers";

const {

    create: createSalaryComponentSchema,
    update: updateSalaryComponentSchema,
    getById: getByIdSalaryComponentSchema,
    delete: deleteSalaryComponentSchema,
} = require('../../validations/salarycomponent');

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

const create = async (payload) => {
    try {
        const { error } = createSalaryComponentSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }

        return await salarycomponent_service.create(payload);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
const update = async (payload, id) => {
    try {
        const { error } = [updateSalaryComponentSchema.body.validate(payload), updateSalaryComponentSchema.query.validate(id)];
        if (error) {
            const { details } = error;
            const { message } = details.map(i => i.message.replace(/\"/g, "")).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await salarycomponent_service.update(id, payload);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
const getById = async (id) => {
    try {
        const { error } = getByIdSalaryComponentSchema.query.validate(id);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, "")).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await salarycomponent_service.getById(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
const list = async () => {
    try {
        return await salarycomponent_service.list();
    } catch (error) {

        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
const remove = async (id) => {
    try {
        const { error } = deleteSalaryComponentSchema.query.validate(id);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, "")).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await salarycomponent_service.remove(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};