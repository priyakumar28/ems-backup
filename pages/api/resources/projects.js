const clientsResource = require("./clients");
module.exports = {
  transform(project) {
    if (project && typeof project === "object") {
      return {
        id: project.id,
        name: project.name,
        details: project.details,
        status: project.status,
        start_date: project.start_date,
        end_date: project.end_date,
        created: project.created,
        client: clientsResource.transform(project.client_client),
      };
    }
    return {};
  },

  transformCollection(projects) {
    projects = typeof projects === "object" ? projects : [];
    var data = [];
    for (var i = 0; i < projects?.length; i++) {
      data.push(this.transform(projects[i]));
    }
    return data;
  },
};
