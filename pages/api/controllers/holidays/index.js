const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const { basic } = require('../../services/holidays');
const requireAuth = require('../../middlewares/_requireAuth');
const {response} = require('../../helpers');
const { 
    getById: getEmployeeSchema,
    create: createHolidaysSchema,
    update: updateEmployeeSchema,
    list: listHolidaysSchema,
    remove: deleteEmployee
} = require('../../validations/holidays');



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
 * Get all holidays and send as response.
 * @public
 */
const getById = async (id) => {
    try {
        // Validate the incoming request
        const { error } = getEmployeeSchema.body.validate({id});
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        // Return holidays by his/her id by calling the holidays services
       return await basic.getById(id);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Create new holidays
 * @public
 */
const create = async (payload) => {
    try {
        // Validate the incoming request
        const { error } = createHolidaysSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
       return await basic.create(payload);
    } catch (error) {
        // return response with status code
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Update existing employee
 * @public
 */
const update = async (payload, id) => {
    try {
        // Validate the incoming request
        const { error } = updateEmployeeSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await basic.update(payload, id);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Get employee list
 * @public
 */
const list = async () => {
    try {
     return await basic.list();
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Delete employee
 * @public
 */
const remove = async (id) => {
    try {
         // Validate the incoming request
         const { error } = deleteEmployee.query.validate({id});
         if (error) {
             const { details } = error;
             const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
             return response(UNPROCESSABLE_ENTITY, message);
        }
        return await basic.remove(id);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
