const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../../config/status_codes');
const { models: {
    dataentrybackups: Dataentrybackups
} } = require('../../models');
const dataentrybackupResourecs = require('../../resources/dataentrybackups');
const i18next = require('../../config/i18n');


exports.getById = async (id,req) => {
    try {
        let i18n = i18next(req);
        // return dataentrybackups by his/her id by calling the employee services
        let dataentrybackups = await Dataentrybackups.findOne({ where: { id: id } });
        if (!dataentrybackups) {
            return response(BAD_REQUEST, i18n.t("id_not_found"));
        }

        return response(OK, i18n.t("id_found"), dataentrybackupResourecs.transform(dataentrybackups));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};



exports.create = async (payload,req) => {
    try {
        let i18n = i18next(req);
        let dataentrybackupsObj = await Dataentrybackups.create(payload);
        //Create new dataentrybackup by calling the dataentrybackup services and return response
        dataentrybackupsObj = dataentrybackupResourecs.transform(dataentrybackupsObj);

        return response(OK, i18n.t("dataentrybackup_created"), dataentrybackupsObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        let i18n = i18next(req);
        let dataentryupdateObj = await Dataentrybackups.findOne({ where: { id: id } });

        if (!dataentryupdateObj) {
            return response(BAD_REQUEST, i18n.t("id_not_found"));
        }

        await Dataentrybackups.update(payload, { where: { id: id }, returning: true });
        dataentryupdateObj = (await this.getById(id)).data;

        return response(OK, i18n.t("dataentrybackup_updated"), dataentryupdateObj);

    } catch (error) {

        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.list = async (req) => {
    try {                           
        let i18n = i18next(req);
        let dataentrylistObj = await Dataentrybackups.findAll();

        return response(OK, i18n.t("list_found"), dataentrybackupResourecs.transformCollection(dataentrylistObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.remove = async (id,req) => {
    try {
        let i18n = i18next(req);
        let dataentrybackup = await Dataentrybackups.destroy({ where: { id: id } });
        if (!dataentrybackup) {
            return response(BAD_REQUEST, i18n.t("id_not_found"));
        }
        return response(OK, i18n.t("dataentrybackup_removed"), dataentrybackup);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}