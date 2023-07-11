const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const Documents = require('../../services/documents');
const requireAuth = require('../../middlewares/_requireAuth');
const { ac } = require("../../middlewares/accesscontrol");
const { response } = require("../../helpers");
import { module_helpers } from '../../config/module_helpers';
const {
    getById: getDocumentsSchema,
    create: createDocumentsSchema,
    update: updateDocumentsSchema,
    list: listDocumentsSchema,
    delete: deleteDocumentsSchema

} = require('../../validations/documents');

let moduleCategory = module_helpers["Employee management"]
moduleCategory.CREATE_DOCUMENTS = module_helpers["Create documents"].CREATE_DOCUMENTS;
moduleCategory.VIEW_DOCUMENTS = module_helpers["View documents"].VIEW_DOCUMENTS;
moduleCategory.UPDATE_DOCUMENTS = module_helpers["Update documents"].UPDATE_DOCUMENTS;
moduleCategory.DELETE_DOCUMENTS = module_helpers["Delete documents"].DELETE_DOCUMENTS;
export const config = {
  api: {
    bodyParser: false,
  },
};
export default requireAuth(async (req, res) => {
    const {
        query: {
            id
        },
        method
    } = req;
    let modules = Object.values(moduleCategory);

    let permission = await ac(req.user.roles, modules, req.user.email);

  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
    switch (method) {
        case "GET":
            if (permission[moduleCategory.VIEW_DOCUMENTS]) {
            if (id) {
                result= await getById(req.query.id,permission, req.user);
            } else {
                 result =await list();
                }
              }
            break; 
      case "POST":
        if (permission[moduleCategory.CREATE_DOCUMENTS]) {
        result = await create(req.body, permission,req.user);
        }
        break; 
        case "PUT":
            if (permission[moduleCategory.UPDATE_DOCUMENTS]) {
            result = await update(req.body, req.query.id,permission, req.user);
          }
          break;
        case "DELETE":
            if (permission[moduleCategory.DELETE_DOCUMENTS]) {
            result = await remove(req.query.id, permission);
            }
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
            result = response(false, `Method ${method} Not Allowed`);
    }
  return res.json(result);
});

const getById = async (id) => {

    
    try {

        const { error } = getDocumentsSchema.query.validate({ id });
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }

        return await Documents.getById(id, usrr)

    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
    

export const create = async (payload,usrr) => {
   
  try {
            payload['createdBy'] = usrr.email;
            
            const { error } = createDocumentsSchema.body.validate(payload.fields);
            if (error) {
                const { details } = error;
                const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
              return response(UNPROCESSABLE_ENTITY, message);
            }
             payload["createdAt"] = new Date();
             payload["updatedAt"] = new Date();
            return await Documents.create(payload, usrr);
            
        }
        catch (error) {            
            return response(INTERNAL_SERVER_ERROR, error.message);
        }
    }
  

export const update = async (payload, id, usrr) => {
    try {
      const { error } = updateDocumentsSchema.body.validate(payload);
      if (error) {
        const { details } = error;
        const message = details
          .map((i) => i.message.replace(/\"/g, ""))
          .join(",");
        return response(UNPROCESSABLE_ENTITY, message);
      }

      return await Documents.update(payload, id, usrr);
      
    } catch (error) {
       return response(INTERNAL_SERVER_ERROR, error.message);
    }
 
};

export const list = async () => {
        try {
           return await Documents.list();
        }
        catch (error) {
 return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const remove = async (id, usrr) => {
    try{
            const { error } = deleteDocumentsSchema.query.validate({ id });
            if (error) {
                const { details } = error;
                const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
                return response(UNPROCESSABLE_ENTITY, message);
            }
            return await Documents.remove(id, usrr);
        } catch (error) {
            return response(INTERNAL_SERVER_ERROR, error.message);
        }
    
};



