const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    emails: Emails
} } = require('../../models');

exports.getById = async (id) => {
    try{
        let emailsObj = await Emails.findOne({where: {id:id} });
        if (!emailsObj) {
            return response(BAD_REQUEST, "data with given id not found");
          }

        return response(OK, "emails get by the id", emailsObj);
    } catch (error) {
        return response( INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.create = async (payload) => {
    try {
        
        let emailscreateObj = await Emails.create(payload);

        return response(OK, "New email created", emailscreateObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        let emailsupdateObj = await Emails.update(payload, {where: {id:id}});

        return response(OK, "email successfully updated", emailsupdateObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        let emailslistObj = await Emails.findAll({
            order: [['id', 'DESC']],
        });

        return response(OK, "list of emails", emailslistObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let emailsremoveObj = await Emails.destroy({where:{id:id}});
        if (!emailsremoveObj) {
            return response(BAD_REQUEST, "data with given id not found");
          }

        return response(OK, "Deleted successfully given id", emailsremoveObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response  = (code, message, data = {}) =>
{
    return {code, message, data};
} 