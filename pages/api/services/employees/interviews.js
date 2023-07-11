const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    interviews: Interviews
} } = require('../../models');


exports.getById = async (id) => {
    try {

        let interviewObj = await Interviews.findOne({ where: { id: id } });
        if (!interviewObj) {
            return response(BAD_REQUEST, "data with given id not found");
        }

        return response(OK, "emails get by the id" + id, interviewObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.create = async (payload) => {
    try {
        let interviewscreateObj = await Interviews.create(payload);
        //Create new interview by calling the interview services and return response

        return response(OK, "New Interview created", interviewscreateObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

exports.update = async (payload, id) => {
    try {
        let interviewsupdateObj = await Interviews.update(payload, { where: { id: id } });

        return response(OK, "Interviews Successfully Updated", interviewsupdateObj);

    } catch (error) {

        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.list = async () => {
    try {
        let interviewslistObj = await Interviews.findAll(
            {
                include: [
                    'candidate_candidate',
                    'job_job'
                ]
            });

        return response(OK, "list of Interviews", interviewslistObj)

    } catch (error) {

        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.remove = async (id) => {
    try {
        let interview = await Interviews.destroy({ where: { id: id } });
        if (!interview) {
            return response(BAD_REQUEST, "data with given id not found");
        }

        return response(OK, "Interviews successfully deleted", interview);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}