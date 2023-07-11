const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const { basic } = require('../../services/department');
const requireAuth = require('../../middlewares/_requireAuth');
const { ac } = require('../../middlewares/accesscontrol');
const { response } = require('../../helpers');
const {
    getById: getDepartmentSchema,
    create: createDepartmentSchema,
    update: updateDepartmentSchema,
    remove: deleteDepartmentSchema
} = require('../../validations/department');
const { module_helpers } = require('../../config/module_helpers');
let moduleCategory = module_helpers["Department management"];
moduleCategory.VIEW_EMPLOYEES = module_helpers["Employee management"].VIEW_EMPLOYEES;
let permission, modules;
export default requireAuth(async (req, res) => {
    const {
        query: {
            id
        },
        method
    } = req;
    modules = Object.values(moduleCategory);
    permission = await ac(req.user.roles, modules, req.user.email);
    let result = response(UNAUTHORIZED, "Unauthorized to access this service");
    switch (method) {
        case "GET":
            if (permission[moduleCategory.VIEW_DEPARTMENTS]) {
                if (id) {
                    result = await getById(req.query.id, permission);
                } else {
                    result = await list(permission);
                }
            }
            break;
        case "POST":
            if (permission[moduleCategory.CREATE_DEPARTMENTS]) {
                result = await create(req.body);
            }
            break;
        case "PUT":
            if (permission[moduleCategory.UPDATE_DEPARTMENTS]) {
                result = await update(req.body, req.query.id, req.user);
            }
            break;
        case "DELETE":
            if (permission[moduleCategory.DELETE_DEPARTMENTS]) {
                result = await remove(req.query.id, req.user);
            }
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
            result = response(false, `Method ${method} Not Allowed`);
    }
    return res.json(result);
});
const cant = (err) => {
    const { details } = err;
    const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
    return response(UNPROCESSABLE_ENTITY, message);
}
export const getById = async (id, permission) => {
    try {
        const { error } = getDepartmentSchema.query.validate();
        if (error) {
            return cant(error);
        }
        return await basic.getById(id, permission);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
export const create = async (payload) => {
    try {
        const { error } = createDepartmentSchema.body.validate(payload);
        if (error) {
            return cant(error);
        }
        return await basic.create(payload);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
export const update = async (payload, id, usrr) => {
    try {
        if (payload.hasOwnProperty("rManagers") || payload.hasOwnProperty("removeManager")) {
            return await basic.update(payload, id);
        }
        else{
            
            const { error } = updateDepartmentSchema.body.validate(payload);
            if (error) {
                return cant(error);
            }
            return await basic.update(payload, id);
        }
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
export const list = async (permission) => {
    try {
        return await basic.list(permission);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message, []);
    }
};
export const remove = async (id, usrr) => {
    try {
        const { error } = deleteDepartmentSchema.query.validate({ id });
        if (error) {
            return cant(error);
        }
        return await basic.remove(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};