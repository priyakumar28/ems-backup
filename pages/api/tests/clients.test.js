import { create, update, list, remove } from '../controllers/clients';

describe('testing clients route', () => {
    const testData = [
        {
            name: "keerthana",
            details: "fghjhgfghhgh",
            first_contact_date: 22 - 12 - 2022,
            created: 22 - 11 - 2021,
            address: "no.12,3rdstreet,nungambakam",
            contact_number: "1234567890",
            contact_email: "keerthana@gmail.com",
            company_url: "www.keerthanatech.com",
            status:"Active"
        },

        
        { 
            details: "fghjhgfghhgh",
        },
        { 
            name:1223432,
        }

    ];
    const testdata1 = [
        {
            name: "keerthanawertyuytredfgcvfghfghgthjfvbnfghjtyuh",
            details: "fghjhgfghhgh",
            first_contact_date: 22 - 12 - 2022,
            created: 22 - 11 - 2021,
            address: "no.12,3rdstreet,nungambakam",
            contact_number: "1234567890",
            contact_email: "keerthana@gmail.com",
            company_url: "www.keerthanatech.com",
            status: "Active"
        },
        {
            name: "keerthyuh",
            details: "fghjhgfghhgh",
            first_contact_date: 22 - 12 - 2022,
            created: "vhjdcdsc",
            address: "no.12,3rdstreet,nungambakam",
            contact_number: "1234567890",
            contact_email: "keerthana@gmail.com",
            company_url: "www.keerthanatech.com",
            status: "Active"
        },
        {
            name: "keerthana",
            details: "fghjhgfghhgh",
            first_contact_date: 22 - 12 - 2022,
            created: 22 - 11 - 2021,
            address: "no.12,3rdstreet,nungambakam",
            contact_number: "1234567890344",
            contact_email: "keerthana@gmail.com",
            company_url: "www.keerthanatech.com",
            status: "Active"
        },
        {
            name: "keertha",
            details: "fghjhgfghhgh",
            first_contact_date: 22 - 12 - 2022,
            created: 22 - 11 - 2021,
            address: "no.12,3rdstreet,nungambakam",
            contact_number: "1234567890",
            contact_email: "keerthana@gmail.in",
            company_url: "www.keerthanatech.com",
            status: "Active"
        },


        
    ];

    test("Create clients with correct data", async () => {
        let result = await create(testData[0]);
        expect(result.code).toBe(200);
    });
    for (let i of testdata1) {
        test("Create clients with incorrect data", async () => {
            let result = await create(i);
            expect(result.code).toBe(422);
        });
    }
    test("Update clients with correct data", async () => {
        let id = 1;
        let usrr = {id:2,email: "keerthana@bassure.com"}
        let result = await update(testData[1], id,usrr);
        expect(result.code).toBe(200);
    });
    test("Update clients with incorrect data", async () => {
        let id = 5;
        let usrr = { id: 2, email: "keerthana@bassure.com" }
        let result = await update(testData[2], id, usrr);
        expect(result.code).toBe(422);
    });
    test("Getting list of clients with correct data", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
    test("Delete clients with correct data", async () => {
        let id = 5
        let result = await remove(id);
        expect(result.code).toBe(200);
    });
   
})