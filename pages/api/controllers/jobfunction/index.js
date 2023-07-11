const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const jobfunction = require('../../services/jobfunction');
const requireAuth = require('../../middlewares/_requireAuth')
const { response } = require('../../helpers');
const{
    getById: getJobfunctionSchema,
    create: createJobfunctionSchema,
    update: updateJobfunctionSchema,
    list: listJobfunctionSchema,
    delete: deleteJobfunctionSchema
} = require('../../validations/jobfunction');

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
            result = await update(req.query.id,req.body);
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
        const { error } = getJobfunctionSchema.query.validate({id});
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
       return await jobfunction.getById(id);
    }catch(error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const create = async (payload) => {
    try{
        const { error } = createJobfunctionSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await jobfunction.create(payload);
    }catch(error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const update = async ( id,payload) => {
    try{
        const { error } = updateJobfunctionSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await jobfunction.update(id,payload);    
    }catch(error) {
        return res.status(INTERNAL_SERVER_ERROR, error.message);
        
    }
};

const list = async () => {
    try {
        return await jobfunction.list();
    }catch(error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const remove = async (id) => {
    try{
        const { error } = deleteJobfunctionSchema.query.validate({id});
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await jobfunction.remove(id);
    }catch{
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


