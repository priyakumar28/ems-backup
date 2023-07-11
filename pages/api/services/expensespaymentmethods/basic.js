const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    expensespaymentmethods: ExpensesPaymentMethods

} } = require('../../models');
const expensesPaymentMethodResource = require('../../resources/expensespaymentmethod');
exports.getById = async (id) => {
    try {
        let expensesPaymentMethodObj = await ExpensesPaymentMethods.findOne({ where: { id: id } });
        expensesPaymentMethodObj = expensesPaymentMethodResource.transform(expensesPaymentMethodObj)
        return response(OK, "getting data individually throuh ID", expensesPaymentMethodObj)

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let expensesPaymentMethodObj = await ExpensesPaymentMethods.create(payload);
        expensesPaymentMethodObj = expensesPaymentMethodResource.transform(expensesPaymentMethodObj);
        return response(OK, "New expenses payment method created", expensesPaymentMethodObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


exports.update = async (id, payload) => {
    try {
        let expensesPaymentMethodObj = await ExpensesPaymentMethods.update(payload, { where: { id: id }, returning: true });
        expensesPaymentMethodObj = (await this.getById(id)).data;
        return response(OK, "row updated", expensesPaymentMethodObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


exports.list = async () => {
    try {
        let expensesPaymentMethodObj = await ExpensesPaymentMethods.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK, "finding the data", expensesPaymentMethodResource.transformCollection(expensesPaymentMethodObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let expensesPaymentMethodObj = await ExpensesPaymentMethods.destroy({ where: { id: id } });
        return response(OK, "deleting data", expensesPaymentMethodObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}

