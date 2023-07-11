const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const auditlog = require('../../services/auditlog');
const requireAuth = require('../../middlewares/_requireAuth');

const {
    getById: getAuditlogSchema,
    create: createAuditlogSchema,
    update: updateAuditlogSchema,
    list: listAuditlogSchema,
    delete: deleteAuditlogSchema
} = require('../../validations/auditlog');
const { response } = require('../../helpers');



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

const getById = async (id) => {
    try {
        const { error } = getAuditlogSchema.query.validate({ id });
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY,message);
        }
        return await auditlog.getById(req.query.id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);

    }
};

const create = async (payload) => {
    try {
        const { error } = createAuditlogSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY,message);
        }
        return await auditlog.create(payload);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
    }
};

const update = async (payload,id) => {
    try {
        const { error } = updateAuditlogSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY).json({ message });
        }
        return await auditlog.update(id, payload);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);

    }
};

const list = async () => {
    try {
        return await auditlog.list();
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message );
    }
};

const remove = async (id) => {
    try {
        const { error } = deleteAuditlogSchema.query.validate({ id });
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY,message);
        }
        return await auditlog.remove(req.query.id);
    } catch {
        return response(INTERNAL_SERVER_ERROR,error.message);

    }
};