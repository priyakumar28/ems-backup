
const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    overtimecategories: Overtimecategories
} } = require('../../models');

const overtimecategory = require('../../resources/overtimecategories');

exports.getById = async (id) => {
    try {
        let overtimecategoriesObj = await Overtimecategories.findOne({ where: { id: id } });
        return response(OK, "New overtime category id is", overtimecategoriesObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.create = async (payload) => {
    try {
        let overtimecategoriesObj = await Overtimecategories.create(payload);
        overtimecategoriesObj = overtimecategory.transform(overtimecategoriesObj);
        return response(OK, "New overtime category is created", overtimecategoriesObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        let overtimecategoriesObj = await Overtimecategories.update(payload, { where: { id: id }, returning: true });
        overtimecategoriesObj = (await this.getById(id)).data;
        return response(OK, "New overtime Category is successfully updated", overtimecategoriesObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let overtimecategoriesObj = await Overtimecategories.destroy({ where: { id: id } });
        return response(OK, "New overtime Category is successfully deleted", overtimecategoriesObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

exports.list = async () => {
    try {
        let overtimecategories = await Overtimecategories.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK, "New list is here ", overtimecategories);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};


const response = (code, message, data = {}) => {
    return { code, message, data };
};
