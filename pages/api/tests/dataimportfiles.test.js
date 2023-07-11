import { create, update, list, remove } from '../controllers/dataimportfiles';
describe('testing dataimportfiles route', () => {
    const testData = [
        {
            name: "EMS DATA",
            data_import_definition: "fghjhgfghhgh",
            status: "wsdmlk3lwk",
            file: "documents",
            details: "dieuik,smwieowk",
            updated: 22 - 12 - 2022,
            created: 22 - 12 - 2022,
        },
        {
            name: "EMS DATA",
            data_import_definition: "fghjhgfghhgh",
            status: "wsdmlk3lwk",
            file: "documents",
            details: "dieuik,smwieowk",
            updated: 22 - 12 - 2022,
            created: 22 - 12 - 2022,
        },
        {
            name: "EMS DATA",
            data_import_definition: "fghjhgfghhgh",
            status: "wsdmlk3lwk",
            file: "documents",
            details: "dieuik,smwieowk",
            updated: 22 - 12 - 2022,
            created: 22 - 12 - 2022,
        },
    ];
    const testdata1 = [
        {
            name: "EMS@ DATA",
            data_import_definition: "fghjhgfghhgh",
            status: "wsdmlk3lwk",
            file: "documents",
            details: "dieuik,smwieowk",
            updated: 22 - 12 - 2022,
            created: 22 - 12 - 2022,
        },
        {
            name: "EMS DATA",
            data_import_definition: "fghjhgfghhgh",
            status: "wsdmlk3lwk",
            file: "documents",
            details: "dieuik,smwieowk",
            updated: 32 - 12 - 2022,
            created: 22 - 12 - 2022,
        },
        {
            name: "EMS DATA93ieieeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            data_import_definition: "fghjhgfghhgh",
            status: "298wiiiiiiiiiiiiiiii@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
            file: "documents",
            details: "dieuik,smwieowk",
            updated: 22 - 12 - 2022,
            created: 22 - 12 - 2022,
        },
        
    ];
    test("Create dataimportfiles with correct data", async () => {
        let result = await create(testData[0]);
        expect(result.code).toBe(200);
    });
    for (let i of testdata1) {
        test("Create dataimportfiles with incorrect data", async () => {
            let result = await create(i);
            expect(result.code).toBe(422);
        });
    }
    test("Update dataimportfiles with correct data", async () => {
        let id = 1;
        let usrr = {id:2,email: "keerthana@bassure.com"}
        let result = await update(testData[1], id,usrr);
        expect(result.code).toBe(200);
    });
    test("Update dataimportfiles with incorrect data", async () => {
        let id = 5;
        let usrr = { id: 2, email: "keerthana@bassure.com" }
        let result = await update(testdata1[2], id, usrr);
        expect(result.code).toBe(422);
    });
    test("Getting list of dataimportfiles with correct data", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
    test("Delete dataimportfiles with correct data", async () => {
        let id = 1
        let result = await remove(id);
        expect(result.code).toBe(200);
    });
})
