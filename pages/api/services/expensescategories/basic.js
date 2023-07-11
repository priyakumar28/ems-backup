const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    expensescategories: ExpensesCategories
} } = require('../../models');
const expensesCategoriesResource = require('../../resources/expensescategories');

exports.getById = async (id) => {
    try {
        let expensesCategoriesObj = await ExpensesCategories.findOne({ where: { id: id } });
        return response(OK, "getting data individually throuh ID", expensesCategoriesResource.transform(expensesCategoriesObj))

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let expensesCategoriesObj = await ExpensesCategories.create(payload);
        expensesCategoriesObj = expensesCategoriesResource.transform(expensesCategoriesObj);
        return response(OK, "New expenses categories created", expensesCategoriesObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


exports.update = async (id, payload) => {
    try {
        let expensesCategoriesObj = await ExpensesCategories.update(payload, { where: { id: id }, returning: true });
        expensesCategoriesObj = (await this.getById(id)).data;
        return response(OK, "row updated", expensesCategoriesObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


exports.list = async () => {
    try {
        let expensesCategoriesObj = await ExpensesCategories.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK, "finding the data", expensesCategoriesResource.transformCollection(expensesCategoriesObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let expensesCategoriesObj = await ExpensesCategories.destroy({ where: { id: id } });
        return response(OK, "deleting data", expensesCategoriesObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}

