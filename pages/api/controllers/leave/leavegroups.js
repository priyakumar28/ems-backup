const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const  basic  = require('../../services/leavegroups');
const requireAuth = require('../../middlewares/_requireAuth');
const { response } = require('../../helpers');
const { 
    getById: getLeaveGroupSchema,
    list: getAllLeaveGroupSchema,
    create: createLeaveGroupSchema,
    update: updateLeaveGroupSchema,
    remove: removeLeaveGroupSchema
} = require('../../validations/leavegroups');

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
            result = await update(req, res);
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

const cant = (err,res)=>{
    const { details } = err;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
}
const getById = async (id) => {
    try {
        const { error } = getLeaveGroupSchema.query.validate({id});
        if (error) {
           return cant(error,res);
        }
        return await basic.getById(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


const create = async (payload) => {
    try {
        const { error } = createLeaveGroupSchema.body.validate(payload);
        if (error) {
          return cant(error,res);
        }
        return await basic.create(payload);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


const update = async (payload, id) => {
    try {
        const { error } = updateLeaveGroupSchema.query.validate({id});
        if (error) {
           return cant(error,res);
        }
         const {error2}   = updateLeaveGroupSchema.body.validate(payload);
        if (error2) {
            return cant(error2,res);
        }
        return await basic.update(payload,id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const list = async () => {
    try {
        return await basic.list();
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


const remove = async (id) => {
    try {
        const { error } = removeLeaveGroupSchema.query.validate({id});
        if (error) {
           return cant(error,res);
        }
        return await basic.remove(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

