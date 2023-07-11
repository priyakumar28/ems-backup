const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const { nomineedetails_service } = require('../../services/nomineedetails');
const requireAuth = require('../../middlewares/_requireAuth');
const { ac } = require('../../middlewares/accesscontrol');
const { response } = require('../../helpers');

const {
    getById: getNomineeDetailsSchema,
    create: createNomineeDetailsSchema,
    update: updateNomineeDetailsSchema,
    delete: deleteNomineeDetailsSchema
} = require('../../validations/nomineedetails');


const { module_helpers } = require("../../config/module_helpers");

let moduleCategory = module_helpers["Employee management"];
let permission, modules;
export default requireAuth(async (req, res) => {
    const {
        query: {id,emp},
        method, 
    } = req;

    modules = Object.values(moduleCategory);
    permission = await ac(req.user.roles, modules, req.user.email);
    let result = response(UNAUTHORIZED, "Unauthorized to access this service");

    switch (method) {
        case "GET":
            if (permission[moduleCategory.VIEW_NOMINEE_DETAILS]) {
                if (id) {
                    result = await getById(req.query.id,permission,req.user);
                } else {
                    result = await list();
                }
            }
            break;
        
        case "POST":
            if (permission[moduleCategory.CREATE_NOMINEE_DETAILS]   || req.user.employee.id === req.body.employee) {
                result = await create(req.body,req.user,permission);
            }
            break;
        case "PUT":
            if (permission[moduleCategory.UPDATE_NOMINEE_DETAILS] || req.user.employee.id === req.body.employee) {
                result = await update(req.body, req.query.id, req.user, permission);
            }
            break;
        case "DELETE":
            if (permission[moduleCategory.DELETE_NOMINEE_DETAILS] || req.user.employee.id === emp) {
                result = await remove( req.query.id, req.user, permission);
            }
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
            result = response(false, `Method ${method} Not Allowed`);
    }
    return res.json(result);
});

export const getById = async (id) => {
    
        try {
            const { error } = getNomineeDetailsSchema.query.validate({ id });
            if (error) {
                const { details } = error;
                const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
                return response(UNPROCESSABLE_ENTITY,message);
            }
            return await nomineedetails_service.getById(id);
        } catch (error) {
            return response(INTERNAL_SERVER_ERROR,error.message);
        }
};

export const create = async (payload,permission,usrr) => {
        try {
            let emp = payload.employee;

            const { error } = createNomineeDetailsSchema.body.validate(payload);
            if (error) {
                const { details } = error;
                const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
                return response(UNPROCESSABLE_ENTITY,message);
            }
            return await nomineedetails_service.create(payload,permission,usrr, emp);
        } catch (error) {
            return response(INTERNAL_SERVER_ERROR,error.message);
        }
    
};

export const update = async (payload, id, usrr,permission) => {
        try {
            // let emp = payload.employee;
            // delete payload.employee;
            const { error } = updateNomineeDetailsSchema.body.validate(payload);
            if (error) {
                const { details } = error;
                const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
                return response(UNPROCESSABLE_ENTITY, message);
            }
            return await nomineedetails_service.update(payload, id, usrr,permission);
        } catch (error) {
            console.log(error)
            return response(INTERNAL_SERVER_ERROR, error.message);
        }
    

};

export const list = async (usrr) => {
        try {
            return await nomineedetails_service.list(usrr);
        } catch (error) {
            return response(INTERNAL_SERVER_ERROR, error.message);
        }
   
};

export const remove = async (id, usrr, permission) => {
        try {
            const { error } = deleteNomineeDetailsSchema.query.validate({id});
            if (error) {
                const { details } = error;
                const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
                return response(UNPROCESSABLE_ENTITY, message);
            }
            return await nomineedetails_service.remove(id, usrr,permission);
        } catch (error) {
            return response(INTERNAL_SERVER_ERROR,error.message);
        }
    
};

