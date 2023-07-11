const { INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const { basic }  = require('../../services/educationlevel');
const requireAuth = require('../../middlewares/_requireAuth');
const { 
    getById: getEmployeeSchema,
    create: createEducationlevelSchema,
    update: updateEmployeeSchema,
    list: listEducationlevelSchema,
    remove: deleteEmployee
} = require('../../validations/educationlevel');
const { response } = require("../../helpers");
export default requireAuth(async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (method) {
    case "GET":
      if (id) {
        result = await getById(req.query.id);
      } else {
        result = await list(req, res);
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
/**
 * Get all educationlevel and send as response.
 * @public
 */
const getById = async (id) => {
    try {
       
        const { error } = getEmployeeSchema.body.validate({ id });
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
           return response(UNPROCESSABLE_ENTITY, message);
        }
           return await basic.getById(id);
       }
    catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Create new educationlevel
 * @public
 */
const create = async (payload) => {
    try {
       // let payload = req.body;
        // Validate the incoming request
        const { error } = createEducationlevelSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
                return response(UNPROCESSABLE_ENTITY, message);
        }
        // Create new educationlevel by calling the educationlevel services
       return await basic.create(payload);
        // return response with status code
       
    } catch (error) {
        // return response with status code
           return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

/**
 * Update existing employee
 * @public
 */
const update = async (payload,id) => {
    try {
        

        // Validate the incoming request
        const { error } = updateEmployeeSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
             return response(UNPROCESSABLE_ENTITY, message);
        }
        // Update an educationlevel by calling the educationlevel services and return response
       return await basic.update(payload,id);
        // return response with status code
       
    } catch (error) {
        // Return exception
           return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Get employee list
 * @public
 */
const list = async (_req, res) => {
    try {
        
        // Return educationlevel list by calling the educationlevel services
       return await basic.list();
        // return response with status code
      

    } catch (error) {
        // Return exception
       return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Delete employee
 * @public
 */
const remove = async (req, res) => {
    try {
//let id= req.query.id;

         // Validate the incoming request
         const { error } = deleteEmployee.body.validate({id});
         if (error) {
             const { details } = error;
             const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
             return response(UNPROCESSABLE_ENTITY, message);
         }
        // Remove the educationlevel by his/her id by calling the educationlevel services
      return await basic.remove(id);
        // return response with status code
        
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
