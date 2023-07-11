const { INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const attendance = require('../../services/attendance');
const requireAuth = require('../../middlewares/_requireAuth');


const {
    getById: getAttendanceSchema,
    create: createAttendanceSchema,
    update: updateAttendanceSchema,
    list: listAttendanceSchema,
    delete: deleteAttendanceSchema
} = require('../../validations/attendance');
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
        const { error } = getAttendanceSchema.query.validate({ id });
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY,message);
        }
        return await attendance.getById(req.query.id);
        
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);

    }
};

const create = async (payload) => {
    try {
        const { error } = createAttendanceSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY,message);
        }

        return await attendance.create(payload);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const update = async (payload,id) => {
    try {
        const { error } = updateAttendanceSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY,message);
        }
        return await attendance.update(id, payload);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
    }
};

const list = async () => {
    try {
        return await attendance.list();
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
    }
};

const remove = async (id) => {
    try {
        const { error } = deleteAttendanceSchema.query.validate({ id });
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY,message);
        }
        return await attendance.remove(req.query.id);
    } catch {
        return response(INTERNAL_SERVER_ERROR,error.message);

    }
};