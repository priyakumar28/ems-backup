const expenseCategoriesResource = require('../resources/expensescategories');
const expensesPaymentmethodResource = require('../resources/expensespaymentmethod');
module.exports = {
    // single transformation
    transform(employeeexpenses) {
        if (employeeexpenses && typeof employeeexpenses === "object") {
            return {
                'id': employeeexpenses.id,
                'employee': employeeexpenses.employee_employee,
                'expense_date': employeeexpenses.expense_date,
                'payment_method': expensesPaymentmethodResource.transform(employeeexpenses.payment_method_expensespaymentmethod),
                'transaction_no': employeeexpenses.textmapped,
                'payee': employeeexpenses.payee,
                'category': expenseCategoriesResource.transform(employeeexpenses.category_expensescategory),
                'notes': employeeexpenses.notes,
                'amount': employeeexpenses.amount,
                //'currency': employeeexpenses.currency,
                'attachment1': employeeexpenses.attachment1,
                'attachment2': employeeexpenses.attachment2,
                'created': employeeexpenses.created,
                'updated': employeeexpenses.updated,
                'status': employeeexpenses.status
            };
        }
        return {};
    },

    //
    transformCollection(employeeexpenses) {
        employeeexpenses = typeof employeeexpenses === "object" ? employeeexpenses : [];
        var data = [];
        for (var i = 0; i < employeeexpenses.length; i++) {
            data.push(this.transform(employeeexpenses[i]));
        }
        return data;
    }

};