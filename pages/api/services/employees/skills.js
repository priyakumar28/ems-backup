const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    skills: Skills
} } = require('../../models');

exports.getById = async (id) => {
    try {
        
        // return skill by his/her id by calling the employee services
        let skills = await Skills.findOne( { where: { id:id } } );
        if (!skills) {
            return response(BAD_REQUEST, "data with given id not found");
          }

        return response( OK, "skill get by the id", skills );
    } catch (error) {
         return response( INTERNAL_SERVER_ERROR, error.message );
    }
};



exports.create = async (payload) => {
    try {
        
        let skillObj = await Skills.create(payload);
        //Create new employee by calling the employee services and return response

        return response( OK, "New skill created", skillObj );
    } catch (error) {
        return response( INTERNAL_SERVER_ERROR, error.message );
    }

};

exports.update = async (payload, id) => {
    try {
        let skillupdateObj = await Skills.update( payload,{ where: { id: id } } );

        return response( OK, "Skills Successfully Updated", skillupdateObj );

    } catch (error) {

        return response( INTERNAL_SERVER_ERROR, error.message );

    }
};

exports.list = async (payload) => {
    try {
        let skilllistObj = await Skills.findAll(payload);

        return response( OK, "list of skills", skilllistObj )

    } catch (error) {

        return response( INTERNAL_SERVER_ERROR,error.message );

    }
};

exports.remove = async (id) => {
    try {
        let skills = await Skills.destroy( { where: { id:id } } );
        if (!skills) {
            return response(BAD_REQUEST, "data with given id not found");
          }

        return response( OK, "Skill successfully deleted", skills );
    } catch (error) {
        return response( INTERNAL_SERVER_ERROR, error.message );
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}