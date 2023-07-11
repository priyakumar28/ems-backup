const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const { basic } = require('../../services/employeeethnicity');
const requireAuth = require('../../middlewares/_requireAuth');

const {
    create: createEmployeeEthnicitySchema,
    getById: getEmployeeEthnicitySchema,
    update: updateEmployeeEthnicitySchema,
    delete: removeEmployeeEthnicitySchema
} = require('../../validations/employeeethnicity');

const { response } = require("../../helpers")

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
 * Create new employee
 * @public
 */
const create = async (payload) => {
    try {
        const { error } = createEmployeeEthnicitySchema.body.validate(payload);
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
const getById = async (id) => {
    try {
        const { error } = getEmployeeEthnicitySchema.query.validate(id);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);

        }
        return await basic.getById(id);

    } catch (errror) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const update = async (payload, id) => {
    try {
        const { error } = updateEmployeeEthnicitySchema.body.validate(payload);
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

const remove = async (id) => {
    try {
        const { error } = removeEmployeeEthnicitySchema.query.validate(id);
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

const list = async () => {
    try {
        return await basic.list();
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

