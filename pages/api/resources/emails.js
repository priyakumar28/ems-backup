module.exports = {
    // single transformation
    transform(email) {
    if (email && typeof email === 'object'){
        return {
            'subject': email.subject,
            'toemail': email.toemail,
            'template': email.template,
            'params': email.params,
            'cclist': email.cclist,
            'bcclist': email.bcclist,
            'error': email.error,
            'created': email.created,
            'updated': email.updated,
            'status': email.status,
            };
        }
        return{};
    },

    transformCollection(emails) {
        var data = [];
        for (var i = 0; i < emails.length; i++) {
            data.push(this.transform(emails[i]));
        }
        return data;
    }

};