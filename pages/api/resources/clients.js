module.exports = {
  // single transformation
  transform(client) {
    if (client && typeof client === "object") {
      return {
        id: client.id,
        name: client.name,
        contact_number: client.contact_number,
        contact_email: client.contact_email,
        company_url: client.company_url,
        status: client.status,
        first_contact_date: client.first_contact_date,
        details: client.details,
        created: client.created,
        address: client.address,
      };
    }
    return {};
  },

  //
  transformCollection(clients) {
    clients = typeof clients === "object" ? clients : [];
    let data = [];
    for (let i in clients) {
      data.push(this.transform(clients[i]));
    }
    return data;
  },
};
