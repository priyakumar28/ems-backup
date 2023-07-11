const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');

const jobtitles= require('../../services/jobtitles');
const requireAuth = require('../../middlewares/_requireAuth');
const { response } = require('../../helpers');
const {
    getById: getJobTitlesSchema,
    create: createJobTitlesSchema,
    update: updateJobTitlesSchema,
    list: listJobTitlesSchema,
    delete: deleteJobTitlesSchema
} = require('../../validations/jobtitles');


/**
 * Get all employees and send as response.
 * @public
 */

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

const getById = async(id) =>{
    try{
        const { error } = getJobTitlesSchema.query.validate({ id });
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await jobtitles.getById(id)

    }
    catch (error){
        return res.status(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Create new employee
 * @public
 */
 const create = async(payload) =>{
     try{
         const { error } = createJobTitlesSchema.body.validate(payload);

         if(error){
           const { details } = error;
           const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
           return response(UNPROCESSABLE_ENTITY, message);
         }
         return await jobtitles.create(payload);
     }
     catch (error){
        return res.status(INTERNAL_SERVER_ERROR, error.message);
     }
 };

 const update = async (payload,id) => {
    try {
        const { error } = updateJobTitlesSchema.body.validate( payload );
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message)
        }
        return await jobtitles.update(id,payload);
    }
    catch (error){
       return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Get employee list
 * @public
 */
const list = async () => {
    try {
        return await jobtitles.list()
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Delete employee
 * @public
 */
const remove = async (id) => {
    try {
        const { error } = deleteJobTitlesSchema.query.validate({ id });
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await jobtitles.remove(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};



 