const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const { leave_groupemployees_service } = require('../../services/leave');
const { response } = require('../../helpers');

const {
    create: createLeaveGroupEmployeesSchema,
    update: updateLeaveGroupEmployeesSchema,
   
    
}= require('../../validations/leavegroupemployees');

const requireAuth = require('../../middlewares/_requireAuth');

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

const create = async (payload) => {
    try {
        //To validate request coming from payload
        const{error} = createLeaveGroupEmployeesSchema.body.validate(payload);
        if(error) {
            const{details} = error;
            const message = details.map(i=>i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await leave_groupemployees_service.create(payload);
    } catch(error) {
        //return response with a status code as defined in ../../config/status_code.js
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const update = async (payload, id) => {
    try {
        //Validate request coming from update payload
        const{error} = updateLeaveGroupEmployeesSchema.body.validate(payload);
        if(error){
            const {details}=error;
            const message = details.map(i=>i.message.replace(/\"/g,"")).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await leave_groupemployees_service.update(id, payload);
    } catch (error) {
     return response(INTERNAL_SERVER_ERROR,error.message);
    }
};

const getById = async (id) => {
    try {
        return await leave_groupemployees_service.getById(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const list = async () => {
    try {
        return await leave_groupemployees_service.list();
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
    }
};

const remove = async (id) => {
    try {
       return await leave_groupemployees_service.remove(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
    }
};
