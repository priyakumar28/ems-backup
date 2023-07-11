module.exports = {
    // single transformation
    transform(setting){
        if (setting && typeof setting === "object"){
        return {
            'id' : setting.id,
            'name' : setting.name,
            'value' : setting.value,
            'description' : setting.description,
            'meta' : setting.meta
        };
    }
    return {};
    },


    transformCollection(settings) {
        settings = typeof settings === "object" ? settings : [];
        var data = [];
        for (var i=0;i<settings?.length; i++) {
            data.push(this.transform(settings[i]));
        }
        return data;
    }

};