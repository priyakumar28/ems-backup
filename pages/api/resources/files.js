module.exports = {
    transform(file){
      if(file && typeof file === "object"){
        return{
            'id':file.id,
            'name':file.name,
            'filename':file.filename,
            'employee':file.employee,
            'file_group': file.file_group,
            'size':file.size,
            'size_text':file.size_text,
        };
      }
    },

    transformCollection(files) {
        files = typeof files === "object" ? files : [];
        var data = [];
        for (var i = 0; i < files?.length; i++) {
            data.push(this.transform(files[i]));
        }
        return data;
    }

};

    
