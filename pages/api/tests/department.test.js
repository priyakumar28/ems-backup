import { create, update, list, remove } from '../controllers/department';
describe('testing department route', () => {
    const testData = [
        {
            name: "EMS DATA",
            code: "HR1",
            description: "wsdmlk3lwk",
           
        },
        {
            name: "EMS DATA",
            code: "HR1",
            description: "wsdmlk3lwk",
        },
        {
            name: "EMS DATA",
            code: "HR1",
            description: "wsdmlk3lwk",
        },
    ];
    const testdata1 = [
        {
            name: 3333,
            code: "HR1",
            description: "wsdmlk3lwk",
        },
        {
            name: "EMS DATA",
            code: 9472398,
            description: "wsdmlk3lwk",
        },
        {
            name: "93222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222201jddddddddddddddddddddddd2@@",
            code: "HR1",
            description: "wsdmlk3lwk",
        },
        
    ];
    test("Create department with correct data", async () => {
        let result = await create(testData[0]);
        expect(result.code).toBe(200);
    });
    for (let i of testdata1) {
        test("Create department with incorrect data", async () => {
            let result = await create(i);
            expect(result.code).toBe(422);
        });
    }
    test("Update department with correct data", async () => {
        let id = 1;
        let usrr = {id:2,email: "keerthana@bassure.com"}
        let result = await update(testData[1], id,usrr);
        expect(result.code).toBe(200);
    });
    test("Update department with incorrect data", async () => {
        let id = 1;
        let usrr = { id: 2, email: "keerthana@bassure.com" }
        let result = await update(testdata1[2], id, usrr);
        expect(result.code).toBe(422);
    });
    test("Getting list of department with correct data", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
    test("Delete department with correct data", async () => {
        let id = 1
        let result = await remove(id);
        expect(result.code).toBe(200);
    });
})