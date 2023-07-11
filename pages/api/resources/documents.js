const employeedocumentsResource = require('./employeedocuments')
const employerdocumentsResource = require('./employerdocuments')
module.exports = {
  transform(document) {
    if (document && typeof document === "object") {
      return {
        'id': document.id,
        'employeedocuments': employeedocumentsResource.transform(document.employeedocuments),
        'employerdocuments': employerdocumentsResource.transform( document.employerdocuments ),
        'name': document.name,
        'details': document.details,
        'expire_notification': document.expire_notification,
       ' expire_notification_month': document.expire_notification_month,
        'expire_notification_week': document.expire_notification_week,
        'expire_notification_day': document.expire_notification_day,
        'sign': document.sign,
        'sign_label': document.sign_label,
        'created': document.created,
        'updated': document.updated,
      };
    }
    return {};
  },

  transformCollection(documents) {
    documents = typeof documents === "object" ? documents : [];
    var data = [];
    for (var i = 0; i < documents?.length; i++) {
      data.push(this.transform(documents[i]));
    }
    return data;
  },
};
