const { INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const { basic } = require('../../services/forms/index');
const { response } = require('../../helpers');
const {
    getById: getFormsSchema,
    create: createFormsSchema,
    update: updateFormsSchema,
    remove: deleteForms
} = require('../../validations/forms');
const requireAuth = require('../../middlewares/_requireAuth');

export default requireAuth(async (req, res) => {
    const {
        query: {id},
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
 * Get all employees and send as response.
 * @public
 */
const getById = async (id) => {
    try {
        const { error } = getFormsSchema.query.validate({id});
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

/**
 * Create new employee
 * @public
 */
const create = async (payload) => {
    try {
       // let payload = req.body;
        // Validate the incoming request
        const { error } = createFormsSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        // Create new employee by calling the employee services
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
        // let payload = req.body;
        // let id = req.query.id;

      
        const { error } = updateFormsSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY,message);
        }
      return await basic.update(payload, id);
    } catch (error) {
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
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Delete employee
 * @public
 */


const remove = async (id) => {
    try {
        // let id = req.query.id;
        const { error } = deleteForms.query.validate({id});
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
