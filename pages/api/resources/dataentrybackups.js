module.exports = {
  // single transformation
  transform(dataentrybackups) {
    if (dataentrybackups && typeof dataentrybackups === 'object'){
      return {
        'id': dataentrybackups.id,
        'tabletype': dataentrybackups.tabletype,
        'data': dataentrybackups.data,
        };
    }
    return{};
  },

  transformCollection(dataentrybackup) {
    var data = [];
    for (var i = 0; i < dataentrybackup?.length; i++) {
      data.push(this.transform(dataentrybackup[i]));
    }
    return data;
  },
};

