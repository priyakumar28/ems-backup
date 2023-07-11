const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const  basic  = require('../../services/employeeleavelog');
const requireAuth = require('../../middlewares/_requireAuth');
const { response } = require('../../helpers');
const { 
    getById: getEmployeeleavelogSchema,
    list: getAllEmployeeleavelogSchema,
    create: createEmployeeleavelogSchema,
    update: updateEmployeeleavelogSchema,
    remove: removeEmployeeleavelogSchema
} = require('../../validations/employeeleavelog');

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

const cant = (err)=>{
    const { details } = err;
    const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
    return response(UNPROCESSABLE_ENTITY,message);
}

const getById = async (id) => {
    try {
        const { error } = getEmployeeleavelogSchema.query.validate({id});
        if (error) {
            cant(error);
        }
         return await basic.getById(id);
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


const create = async (payload) => {
    try {
        const { error } = createEmployeeleavelogSchema.body.validate(payload);
        if (error) {
           cant(error);
        }
        return await basic.create(payload);
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR,  error.message);
    }
};


const update = async (payload, id) => {
    try {
        const { error } = updateEmployeeleavelogSchema.query.validate({id});
        if (error) {
            cant(error);
        }
        const {error2}   = updateEmployeeleavelogSchema.body.validate(payload);
        if (error2) {
            cant(error2);
        }
        return await basic.update(payload, req.query.id);
    } 
    catch (error) {
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
        const { error } = removeEmployeeleavelogSchema.query.validate({id});
        if (error) {
            cant(error);
        }
        return await basic.remove(req.query.id);
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};