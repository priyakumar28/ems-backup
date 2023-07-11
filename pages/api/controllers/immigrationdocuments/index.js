const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED
} = require('../../config/status_codes');

const { immigrationdocuments_service } = require('../../services/Immigrationdocuments');
const { response } = require('../../helpers');
const {
    create: createImmigrationDocumentsSchema,
    update: updateImmigrationDocumentsSchema,
    getById: getByIdImmigrationDocumentsSchema,
    delete: deleteImmigrationDocumentsSchema
} = require('../../validations/immigrationdocuments');

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

/**
 * Get all immigration docs and send as response.
 * @public
 */
const getById = async(id) => {
    try {
      const { error } = getByIdImmigrationDocumentsSchema.query.validate({ id });
      if (error) {
        const { details } = error;
        const message = details
          .map((i) => i.message.replace(/\"/g, ""))
          .join(",");
        return response(UNPROCESSABLE_ENTITY, message);
      }

    return await immigrationdocuments_service.getById(id);
} catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
}
  };
/**
 * Create new immigration document
 * 
 * @public
 */
 const create = async(payload) =>{
     try{
         const { error } = createImmigrationDocumentsSchema.body.validate(payload);
         if(error){
           const { details } = error;
           const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
           return response(UNPROCESSABLE_ENTITY, message);
         }
         return await immigrationdocuments_service.create(payload);
     }
     catch (error){
        return response(INTERNAL_SERVER_ERROR, error.message);
     }
 };

 const update = async (payload, id) => {
    try {
        const { error } = updateImmigrationDocumentsSchema.body.validate(payload);
        if(error){
          const { details } = error;
          const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
          return response(UNPROCESSABLE_ENTITY, message);
        }
       return await immigrationdocuments_service.update(id,payload);
        
    }
    catch (error){
       return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Get immigration documents list
 * @public
 */
const list = async () => {
    try {
        return await immigrationdocuments_service.list()
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Delete immigration document
 * @public
 */
const remove = async (id) => {
    try {
        const { error } = deleteImmigrationDocumentsSchema.query.validate({id});
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await immigrationdocuments_service.remove(id);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};  
