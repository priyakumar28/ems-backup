const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const { basic } = require('../../services/courses');
const requireAuth = require('../../middlewares/_requireAuth');
const { ac } = require('../../middlewares/accesscontrol');
const {
    getById: getCourseSchema,
    create: createCourseSchema,
    update: updateCourseSchema,
    list: listCourseSchema,
    delete: deleteCourseSchema
} = require('../../validations/course');

const { response } = require('../../helpers');

import { module_helpers } from '../../config/module_helpers';

let moduleCategory = module_helpers["Course management"]
let permission, modules;

export default requireAuth(async (req, res) => {
    const {
        query: { id },
        method
    } = req;
    modules = Object.values(moduleCategory);
    permission = await ac(req.user.roles, modules, req.user.email);

    let result = response(UNAUTHORIZED, "Unauthorized to access this service");
    switch (method) {
        case "GET":
            if (permission[moduleCategory.VIEW_COURSES]) {
                if (id) {
                    result = await getById(req.query.id, req.user, permission);
                } else {
                    result = await list();
                }
            }
            break;
        case "POST":
            if (permission[moduleCategory.CREATE_COURSES]) {
                result = await create(req.body, req.user, permission);
            }
            break;
        case "PUT":
            if (permission[moduleCategory.UPDATE_COURSES]) {
                result = await update(  req.body, req.query.id, req.user, permission);
            }
            break;
        case "DELETE":
            if (permission[moduleCategory.DELETE_COURSES]) {
                result = await remove(req.query.id,permission);
            }
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
            result = response(false, `Method ${method} Not Allowed`);
    }
    return res.json(result);
});

/**
 * Get all clients and send as response.
 * @public
 */
const getById = async (id, usrr, perm) => {

    try {
        // Return client by his/her id by calling the client services

        const { error } = getCourseSchema.query.validate();
        if (error) {
            const { details } = error;
            const message = details
                .map((i) => i.message.replace(/\"/g, ""))
                .join(",");
            return response(UNPROCESSABLE_ENTITY, message);
        }

        return await basic.getById(id, usrr, perm);
        //return response(code).send({ clientObj });
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

/**
 * Create new client
 * @public
 */
export const create = async (payload, usrr, perm) => {

    try {
        const { error } = createCourseSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details
                .map((i) => i.message.replace(/\"/g, ""))
                .join(",");
            return response(UNPROCESSABLE_ENTITY, message);
        }

        return await basic.create(payload, usrr, perm);

    } catch (error) {

        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

/**
 * Update existing client
 * @public
 */
export const update = async ( payload,id,usrr,perm) => {

    try {
        const { error } = updateCourseSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details
                .map((i) => i.message.replace(/\"/g, ""))
                .join(",");
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await basic.update(payload,id,usrr,perm);
        //return response(code).send(clientObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
}


/**
 * Get client list
 * @public
 */
export const list = async () => {

    try {

        return await basic.list();
        //return response(code).send(clientObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

/**
 * Delete client
 * @public
 */
export const remove = async (id, usrr, perm) => {

    try {
        const { error } = deleteCourseSchema.query.validate({ id });
        if (error) {
            const { details } = error;
            const message = details
                .map((i) => i.message.replace(/\"/g, ""))
                .join(",");
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await basic.remove(id, usrr, perm);

    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};
