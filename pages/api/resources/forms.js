module.exports = {
    transform(form){
      if(form && typeof form === "object"){
        return{
            'id':form.id,
            'name':form.name,
            'description':form.description,
            'items':form.items,
            'created':form.created,
            'updated':form.updated
            
        };
      }
    },

    transformCollection(forms) {
        forms = typeof forms === "object" ? forms : [];
        var data = [];
        for (var i = 0; i < forms?.length; i++) {
            data.push(this.transform(forms[i]));
        }
        return data;
    }

};
