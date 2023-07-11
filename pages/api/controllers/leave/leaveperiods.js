const { INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const { basic } = require('../../services/leaveperiods');
const requireAuth = require('../../middlewares/_requireAuth');
const { response } = require('../../helpers');
const { 
    getById: getLeavePeriodSchema,
    list: getAllLeavePeriodSchema,
    create: createLeavePeriodSchema,
    update: updateLeavePeriodSchema,
    remove: removeLeavePeriodSchema
} = require('../../validations/leaveperiods');

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
            let payload = {
                name:req.body.Name,
                date_start:req.body.StartDate,
                date_end:req.body.EndDate,
                status:req.body.Status
            }
            result = await update(payload, req.query.id);
            break;
        case "DELETE":
            result = await remove(req.query.id);
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
            result = response(false, `Method ${method} Not Allowed`);
    }
});

const getById = async (id) => {
    try {
        const { error } = getLeavePeriodSchema.query.validate({id});
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await basic.getById(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
    }
};

/**
 * Create new employee
 * @public
 */
const create = async (payload) => {
    try {
        const { error } = createLeavePeriodSchema.body.validate(payload);
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

/**
 * Update existing employee
 * @public
 */
const update = async (payload,id) => {
    try {
        const { error } = updateLeavePeriodSchema.query.validate({id});
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
         const {error2}   = updateLeavePeriodSchema.body.validate(payload);
        if (error2) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await basic.update(payload,req.query.id);
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
        return res.status(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Delete employee
 * @public
 */
const remove = async (id) => {
    try {
        const { error } = removeLeavePeriodSchema.query.validate({id});
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
