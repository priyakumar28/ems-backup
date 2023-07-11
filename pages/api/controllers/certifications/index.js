const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const { basic } = require('../../services/certification');
const {
    getById: getCertificationSchema,
    create: createCertificationSchema,
    update: updateCertificationSchema,
    delete: deleteCertification
} = require('../../validations/certification');
const requireAuth = require('../../middlewares/_requireAuth');
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
    };
    return res.json(result);
});
/**
 * Get all employees and send as response.
 * @public
 */
const getById = async (id) => {
    try {
        //let id = req.query.id;
        return await basic.getById(id);
        //return res.status(code).send(certificationObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
    }
};

/**
 * Create new employee
 * @public
 */
export const create = async (payload) => {
    try {
        
        const { error } = createCertificationSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY,message );
        }
        // Create new employee by calling the employee services
        return await basic.create(payload);
        // return response with status code
       // return response(code).send(certificationObj);
    } catch (error) {
        // return response with status code
        return response(INTERNAL_SERVER_ERROR,error.message);
    }
};

/**
 * Update existing employee
 * @public
 */
export const update = async (payload,id) => {
    try {
        

        const { error } = updateCertificationSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY,message);
        }
        return await basic.update(id, payload);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR,error.message);
    }
};

/**
 * Get employee list
 * @public
 */
export const list = async () => {
    try {
        return await basic.list();
        //return response(code).send(certificationObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message );
    }
};

/**
 * Delete employee
 * @public
 */
export const remove = async (id) => {
    try {
        return await basic.remove(id);
        //return response(code).send(certificationObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
    }
};

