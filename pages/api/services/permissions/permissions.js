
const { OK,CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../../config/status_codes');
const { models:{
    permissions : Permissions,
    modules : Modules,
    userroles:Userroles
}} = require('../../models');
const permissionResource = require('../../resources/permissions');



exports.create = async (payload) => {
    try{
        let permissionObj = await Permissions.create(payload);
        let moduleObj = await Modules.findOne({where :{id:permissionObj.module_id}});
        moduleObj.addModules_permissions(permissionObj);
        let userroleObj = await Userroles.findOne({where :{id:permissionObj.user_role}});
        await userroleObj.addUserroles_modules(moduleObj);
        return response(OK, " permission record  is created",permissionResource.transform(permissionObj));
    }
     catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
    }
};

exports.update = async (module_id, user_role, permissions) =>{
    try {
        let permissionObj = await Permissions.findOne({where : {module_id: module_id, user_role: user_role}});
        if(!permissionObj){
            return await this.create({module_id, user_role, permissions});
        } else {
            permissionObj = await Permissions.update({permissions},{ where: {module_id: module_id, user_role: user_role} });
            return response(OK, " requested permission record is successfully updated", permissionResource.transform(permissionObj)); 
        }
    }
    catch(error){
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (modid,roleid)=> {
    try {
        let permissionObj = await Permissions.destroy({where : {module_id:modid,user_role:roleid}});
        return response(OK, "requested permission record is successfully deleted",  permissionObj);
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

exports.list = async ()=> {
    try {
        let permissionObj = await Permissions.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK, "permission list ",  permissionResource.transformCollection(permissionObj)); 
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};
 

const response = (code, message, data ={}) => {
    return {code, message, data};
};




////////////////////////////////////////////////

// exports.getById = async (id=null,modid=null,roleid=null) => {
//     try {
//         if(!id && modid && roleid){
//             permissionObj = await Permissions.findOne({where:{module_id:modid,user_role:roleid}});
//             if(!permissionObj){
//                 return response(NOT_FOUND, "req module not found", permissionObj);
//             }
//         }
//         let permissionObj = await Permissions.findOne({where:{id:id}});
//         if(!permissionObj){
//             return response(NOT_FOUND, "req module not found", permissionObj);
//         }
        
//         return response(OK, "Requested permissiondetails are", permissionObj);
//     }
//     catch (error) {
//         return response(INTERNAL_SERVER_ERROR, error.message);

//     }
// };