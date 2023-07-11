const { INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('../../config/status_codes');
const skill = require('../../services/employees/skills');
const requireAuth = require('../../middlewares/_requireAuth');
import { response } from "../../helpers";
const {
    getById: getSkillSchema,
    create: createSkillSchema,
    update: updateSkillSchema,
    remove: deleteSkillSchema
} = require('../../validations/skills');

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


export const getById = async (id) => {
    try {
        const { error } = getSkillSchema.query.validate({ id });
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await skill.getById(id);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

export const remove = async (id, res) => {
    try {
        const { error } = deleteSkillSchema.query.validate();
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await skill.remove(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

export const create = async (payload) => {
    try {
        const { error } = createSkillSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }

        return await skill.create(payload);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};


export const update = async (payload, id) => {
    try {
        const { error } = updateSkillSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await skill.update(payload, id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

export const list = async () => {
    try {

        return await skill.list();
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


