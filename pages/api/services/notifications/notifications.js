
const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    notifications: Notifications
} } = require('../../models');

const notification = require('../../resources/notifications');

exports.getById = async (id) => {
    try {
        let notificationsObj = await Notifications.findOne({ where: { id: id } });
        return response(OK, " Notification id is", notification.transform(notificationsObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.create = async (payload) => {
    try {
        let notificationsObj = await Notifications.create(payload);
        notificationsObj = notification.transform(notificationsObj);
        return response(OK, " Notification  is created", notificationsObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        let notificationsObj = await Notifications.update(payload, { where: { id: id }, returning: true });
        notificationsObj = (await this.getById(id)).data;
        return response(OK, " Notification is successfully updated", notificationsObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let notificationsObj = await Notifications.destroy({ where: { id: id } });
        return response(OK, " Notification is successfully deleted", notificationsObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

exports.list = async () => {
    try {
        let notificationsObj = await Notifications.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK, "Notification list is here ", notification.transformCollection(notificationsObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};


const response = (code, message, data = {}) => {
    return { code, message, data };
};
