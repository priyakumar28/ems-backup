module.exports = {
      // single transformation
      transform(overtimecategory) {
          if (overtimecategory && typeof overtimecategory=== "object") {
          return {
              'id' : overtimecategory.id,
              'name' : overtimecategory.name,
              'created' : overtimecategory.created,
              'updated' : overtimecategory.updated
          };
        }
        return {};
    },
      
      transformCollection(overtimecategories) {
          overtimecategories = typeof overtimecategories === "object" ? overtimecategories : [];
          var data = [];
          for (var i=0; i<overtimecategories?.length; i++) {
              data.push(this.transform(overtimecategories[i]));
          }
          return data;
      }
};
