const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const  {employeelanguages_service} = require('../../services/Languages');

const {
    create: createEmployeeLanguagesSchema,
    update: updateEmployeeLanguagesSchema,
    getById: getByIdEmployeeLanguagesSchema,
    delete: deleteEmployeeLanguagesSchema
   
    
}= require('../../validations/languages');

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
                result = await getById(req, res);
            } else {
                result = await list(req, res);
            }
            break;
        case "POST":
            result = await create(req, res);
            break;
        case "PUT":
            result = await update(req, res);
            break;
        case "DELETE":
            result = await remove(req, res);
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
            result = response(false, `Method ${method} Not Allowed`);
    };
    return res.json(result);
});

const create = async (req, res) => {
    try {
        let payload = req.body;
        //To validate request coming from payload
        const{error} = createEmployeeLanguagesSchema.body.validate(payload);
        if(error) {
            const{details} = error;
            const message = details.map(i=>i.message.replace(/\"/g, '')).join(',');
            return res.status(UNPROCESSABLE_ENTITY).json({message});
        }
            //Create new leave type by calling the leave_type_ service
            let { code, ...employeelanguageObj } = await employeelanguages_service.create(payload);
            //return response bro!!!!!!!!
            return res.status(OK).send(employeelanguageObj);
        
    } catch(error) {
        //return response with a status code as defined in ../../config/status_code.js
        return res.status(INTERNAL_SERVER_ERROR).send({message: error.message});

    }
};

const update = async (req, res) => {
    try {
        let payload = req.body;
        let id = req.query.id;

        //Validate request coming from update payload
        const{error} = updateEmployeeLanguagesSchema.body.validate(payload);
        if(error){
            const {details}=error;
            const message = details.map(i=>i.message.replace(/\"/g,"")).join(',');
            return res.status(UNPROCESSABLE_ENTITY).json({message});
        }

        
        //Update the existing language record by calling the leave type service
        let { code, ...employeelanguageObj } = await employeelanguages_service.update(id,payload);
        //return the response!!!!!!!!
        return res.status(OK).send(employeelanguageObj);

    } catch (error) {
     //return response with a status code as defined in ../../config/status_code.js        
     return res.status(INTERNAL_SERVER_ERROR).send({message: error.message});

    }
};

const getById = async (req, res) => {
    try {
        let id = req.query.id;
        let {code, ...employeelanguageObj } = await employeelanguages_service.getById(id);

        return res.status(OK).send(employeelanguageObj);

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({message: error.message});
        
    }
};

const list = async (_req, res) => {
    try {
        
        let {code, ...employeelanguageObj } = await employeelanguages_service.list();
        return res.status(OK).send(employeelanguageObj);

        
    } catch (error) {

        return res.status(INTERNAL_SERVER_ERROR).send({message: error.message});
        
    }
};

const remove = async (req, res) => {
    try {
        let id = req.query.id;
        const { error } = deleteEmployeeLanguagesSchema.query.validate({id});
        if(error){
            const {details} = error;
            const message = details.map(i=>i.message.replace(/\"/g, '')).join(',');
            return res.status(UNPROCESSABLE_ENTITY).json({ message });
        }
        let {code, ... employeelanguageObj } = await employeelanguages_service.remove(id);
        return res.status(code).send(employeelanguageObj);

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({message: error.message});
        
    }
};


