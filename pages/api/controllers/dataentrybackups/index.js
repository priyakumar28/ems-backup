const { INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const dataentrybackup  = require('../../services/employees/dataentrybackups');
const requireAuth = require('../../middlewares/_requireAuth');
const {
    getById: getDataentrySchema,
    create: createDataentrySchema,
    update: updateDataentrySchema,
    remove: deleteDataentrySchema
} = require('../../validations/dataentrybackups');

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
        const { error } = getDataentrySchema.query.validate({ id });
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await dataentrybackup.getById(id);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const create = async (payload) => {
    try {
        const { error } = createDataentrySchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }

        return await dataentrybackup.create(payload);


    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const update = async (payload, id) => {
    try {

        const { error } = updateDataentrySchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await dataentrybackup.update(id, payload);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const list = async () => {
    try {
        return await dataentrybackup.list();


    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const remove = async (id) => {
    try {
        // let id = req.query.id;

        const { error } = deleteDataentrySchema.query.validate({ id });
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await dataentrybackup.remove(req.query.id);


    } catch {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};