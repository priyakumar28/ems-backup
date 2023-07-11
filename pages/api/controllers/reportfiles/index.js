const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED }= require('../../config/status_codes');
const {reportfiles} = require('../../services/reportfiles');
const requireAuth = require('../../middlewares/_requireAuth');
import { response } from "../../helpers";
const {
    getById: reportfilesGetByIdDocumentSchema,
    create: createReportfilesDocumentSchema,
    update: updateReportfilesDocumentSchema,
    list: listReportfilessDocumentSchema,
    delete: deleteReportfilesDocumentSchema
} = require('../../validations/reportfiles');

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
                result = await getById(rereq.query.id);
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
            result = await remove(req, res);
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
            result = response(false, `Method ${method} Not Allowed`);
    }
    return res.json(result);
});

const getById = async (id) => {
    try {
        const { error } = getOverTimeCategoriesSchema.query.validate({id});
        if (error) {
            const { details } = errror;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await basic.getById(id);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const create = async(payload) =>{
    try{
        const { error } = createReportfilesDocumentSchema.body.validate(payload);
        if(error){
          const { details } = error;
          const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await reportfiles.create(payload);
    }
    catch (error){
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};






const update = async (payload, id) => {
    try {
        const { error } = updateReportfilesDocumentSchema.body.validate(payload);
        if(error){
          const { details } = error;
          const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return response(UNPROCESSABLE_ENTITY, message);
        }
        return await reportfiles.update(payload,id);
    }
    catch (error){
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


const list = async (_req, res) => {
    try {
        return await reportfiles.list()
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


const remove = async (req, res) => {
    try {
        return await reportfiles.remove(req.query.id);
       
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};



 