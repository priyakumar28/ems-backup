const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const { basic } = require('../../services/trainingsessions');
const requireAuth = require('../../middlewares/_requireAuth');
const { ac } = require('../../middlewares/accesscontrol');
import { response } from "../../helpers";
const {
    getById: getTrainingSessionSchema,
    create: createTrainingSessionSchema,
    update: updateTrainingSessionSchema,
    delete: deleteTrainingSessionSchema,
    list: listTrainingSessionSchema
} = require('../../validations/trainingsessions');
const { module_helpers } = require('../../config/module_helpers');
let moduleCategory = module_helpers["Training sessions management"]
moduleCategory.VIEW_COURSES = module_helpers["Course management"].VIEW_COURSES
let permission, modules;
export default requireAuth(async (req, res) => {
    const {
        query: {
            id,emp
        },
        method
    } = req;

    modules = Object.values(moduleCategory);
    permission = await ac(req.user.roles, modules, req.user.email);
    let result = response(UNAUTHORIZED, "Unauthorized to access this service");
    switch (method) {
        case "GET":
            if (permission[moduleCategory.VIEW_TRAINING_SESSIONS]||req.user.employee.id == req.query.emp) {
                if (id) {
                    result = await getById(req.query.id,permission);
                } else {
                    result = await list(permission);
                }
            }
            break;
        case "POST":
            if (permission[moduleCategory.CREATE_TRAINING_SESSIONS]) {
                result = await create(req.body,permission);
            }
            break;
        case "PUT":
            if (permission[moduleCategory.UPDATE_TRAINING_SESSIONS]) {
                result = await update(req.body, req.query.id,permission);
            }
            break;
        case "DELETE":
            if (permission[moduleCategory.DELETE_TRAINING_SESSIONS]) {
                result = await remove(req.query.id, req.user);
            }
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
            result = response(false, `Method ${method} Not Allowed`);
    }
    return res.json(result);
});

/**
 * Get all trainingsessions and send as response.
 * @public 
 */
export const getById = async (id,perm) => {
    try {
        // Return trainingsession by his/her id by calling the trainingsession services
        const { error } = getTrainingSessionSchema.query.validate(id);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await basic.getById(id,perm);
    } catch (error) {
        
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Create new trainingsession
 * @public
 */
export const create = async (payload,perm) => {
    try {
        // Validate the incoming request
        const { error } = createTrainingSessionSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        // Create new trainingsession by calling the trainingsession services
        return await basic.create(payload,perm);
    } catch (error) {
        // return response with status code
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Update existing trainingsession
 * @public
 */
export const update = async (payload, id,perm) => {
    try {
        // Update an trainingsession by calling the trainingsession services and return response
        const { error } = updateTrainingSessionSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await basic.update(payload, id,perm);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Get trainingsession list
 * @public
 */
export const list = async (perm) => {
    try {
        // Return trainingsessions list by calling the trainingsession service
        return await basic.list(perm);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Delete trainingsession
 * @public
 */
export const remove = async (id, usrr) => {
    try {
        // Remove the trainingsession id by calling the trainingsession services
        const { error } = deleteTrainingSessionSchema.query.validate({ id });
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
       return await basic.remove(id, usrr);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

