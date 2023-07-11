const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const { leave_rule_service } = require('../../services/leave');
const { response } = require('../../helpers');

const {
    create: createLeaveRuleSchema,
    update: updateLeaveRuleSchema,
   
    
}= require('../../validations/leaverules');

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
        const{error} = createLeaveRuleSchema.body.validate(payload);
        if(error) {
            const{details} = error;
            const message = details.map(i=>i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY,message);
        }
          return await leave_rule_service.create(payload);
    } catch(error) {
        return response(INTERNAL_SERVER_ERROR,error.message);

    }
};

const update = async (payload,id) => {
    try {
        const{error} = updateLeaveRuleSchema.body.validate(payload);
        if(error){
            const {details}=error;
            const message = details.map(i=>i.message.replace(/\"/g,"")).join(',');
            return response(UNPROCESSABLE_ENTITY,message);
        }
        return await leave_rule_service.update(id, payload);
    } catch (error) {
     return response(INTERNAL_SERVER_ERROR,  error.message);
    }
};

const getById = async (id) => {
    try {
        return await leave_rule_service.getById(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
    }
};

const list = async () => {
    try {
        return await leave_rule_service.list();
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const remove = async (id) => {
    try {
        return await leave_rule_service.remove(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
    }
};

