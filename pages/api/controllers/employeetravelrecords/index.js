const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const { basic }  = require('../../services/employeetravelrecords');
const requireAuth = require('../../middlewares/_requireAuth');
const { 
    getById: getEmployeeTravelRecordsSchema,
    create: createEmployeeTravelRecordsSchema,
    update: updateEmployeeTravelRecordsSchema,
    list: listEmployeeTravelRecordsSchema,
    remove: removeEmployeeTravelRecordsSchema
} = require('../../validations/employeetravelrecords');

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
                result =  await getById(req, res);
            } else {
                result =  await list(req, res);
            }
            break;
        case "POST":
            result =  await create(req, res);
            break;
        case "PUT":
            result =  await update(req, res);
            break;
        case "DELETE":
            result =  await remove(req, res);
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
            result = response(false, `Method ${method} Not Allowed`);
    }
    return res.json(result);
});

/**
 * Get all employeeeducations and send as response.
 * @public
 */
const getById = async (req, res) => {
    try {
       
        let id= req.query.id;

        // Validate the incoming request
        const { error } = getEmployeeTravelRecordsSchema.body.validate();
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return res.status(UNPROCESSABLE_ENTITY).json({ message });
        }
        // Return employeeeducations by his/her id by calling the employeeeducations services
        let { code, ...employeeTravelrecordsGetByIdObj } = await basic.getById(id);
        // return response with status code
      
        return res.status(code).send(employeeTravelrecordsGetByIdObj);
    } catch (error) {
        // Return exception
        return res.status(INTERNAL_SERVER_ERROR).send({message: error.message});
    }
};

/**
 * Create new employeeeducations
 * @public
 */
const create = async (req, res) => {
    try {
        let payload = req.body;
        // Validate the incoming request
        const { error } = createEmployeeTravelRecordsSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return res.status(UNPROCESSABLE_ENTITY).json({ message });
        }
        // Create new employeeeducations by calling the employeeeducations services
        let { code, ...employeeTravelrecordsCreateObj } = await basic.create(payload);
        // return response with status code
        return res.status(code).send(employeeTravelrecordsCreateObj);
    } catch (error) {
        // return response with status code
        return res.status(INTERNAL_SERVER_ERROR).send({message: error.message});
    }
};

/**
 * Update existing employeeeducations
 * @public
 */
const update = async (req, res) => {
    try {
        let payload = req.body;
        let id= req.query.id;

        // Validate the incoming request
        const { error } = updateEmployeeTravelRecordsSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return res.status(UNPROCESSABLE_ENTITY).json({ message });
        }
        // Update an employeeeducations by calling the employeeeducations services and return response
        let { code, ...employeeTravelrecordsUpdateObj } = await basic.update(payload,id);
        // return response with status code
        return res.status(code).send(employeeTravelrecordsUpdateObj);
    } catch (error) {
        // Return exception
        return res.status(INTERNAL_SERVER_ERROR).send({message: error.message});
    }
};

/**
 * Get employeeeducations list
 * @public
 */
const list = async (_req, res) => {
    try {
    
        // Return employeeeducations list by calling the employeeeducations services
        let { code, ...employeeTravelrecordsListObj } = await basic.list();
        // return response with status code
        return res.status(code).send(employeeTravelrecordsListObj);

    } catch (error) {
        // Return exception
        return res.status(INTERNAL_SERVER_ERROR).send({message: error.message});
    }
};

/**
 * Delete employeeeducations
 * @public
 */
const remove = async (req, res) => {
    try {
        
         let id= req.query.id;

         // Validate the incoming request
         const { error } = removeEmployeeTravelRecordsSchema.body.validate();
         if (error) {
             const { details } = error;
             const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
             return res.status(UNPROCESSABLE_ENTITY).json({ message });
         }
        // Remove the employeeeducations by his/her id by calling the employeeeducations services
        let { code, ...employeeTravelrecordsRemoveIdObj } = await basic.remove(id);
        // return response with status code
        return res.status(code).send(employeeTravelrecordsRemoveIdObj);
    } catch (error) {
        // Return exception
        return res.status(INTERNAL_SERVER_ERROR).send({message: error.message});
    }
};

