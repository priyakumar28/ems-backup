const documentsResource = require('./documents');


module.exports = {
    transform(employeedocument) {
        if (employeedocument && typeof employeedocument === "object") {
            return {
                'id': employeedocument.id,
                'documents': documentsResource.transform(employeedocument.document_document),
                'name': employeedocument.name,
                'date_added': employeedocument.date_added,
                'valid_until': employeedocument.valid_until,
                'details': employeedocument.details,
                'attachment': employeedocument.attachment,
                'approvalstatus': employeedocument.approvalstatus,
            };
        }
        return {};
    },

    transformCollection(employeedocuments) {
        employeedocuments = typeof employeedocuments === "object" ? employeedocuments : [];
        var data = [];
        for (var i = 0; i < employeedocuments?.length; i++) {
            data.push(this.transform(employeedocuments[i]));
        }
        return data;
    },
};
