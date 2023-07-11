import { create, update, list, remove } from '../controllers/employeecertifications';
describe('testing employeecertifications route', () => {
    const testdata = [
        {
            certification_id: 2,
            certification_name: "bdsdsfds",
            employee: 9,
            institute: "fgfdjyfdfd",
            date_start: 12 - 12 - 2020,
            date_end: 12 - 12 - 2021
        },
        {
            certification_id: 1,
            certification_name: "bdsdsfds",
            employee: 11,
            institute: "fgfdjyfdfd",
            date_start: 12 - 12 - 2020,
            date_end: 12 - 12 - 2021
        },
        {
            certification_name: "java certificate",
           
        },
        {
            institute: 1224234
        }
    ];
    const testdata1 = [
        {
            certification_id: 2,
            certification_name: "bdsdsfds",
            employee: 13,
            institute: "fgfdjyfdfd",
            date_start: 12 - 12 - 2020,
            date_end: 12 - 12 - 2021
        },
        {
            certification_id: 4,
            certification_name: "bdsdsfds",
            employee: 9,
            institute: "fgfdjyfdfd",
            date_start: 12 - 12 - 2020,
            date_end: 12 - 12 - 2021
        },
        {
            certification_id: 6,
            certification_name: "bdsdsfds",
            employee: 10,
            institute: 12345,
            date_start: 12 - 12 - 2020,
            date_end: 12 - 12 - 2021,
        },
    ];
    test("Create employeecertifications with correct data", async () => {
        let result = await create(testdata[0]);
        expect(result.code).toBe(200);
    });
    for (let i of testdata1) {
        test("Create employeecertifications with incorrect data", async () => {
            let result = await create(i);
            expect(result.code).toBe(422);
        });
    }
    test("Update employeecertifications with correct data", async () => {
        let id = 1;
        let result = await update(testdata[2], id);
        expect(result.code).toBe(200);
    });
    test("Update employeecertifications with incorrect data", async () => {
        let id = 3;
        let result = await update(testdata[3], id);
        expect(result.code).toBe(422);
    });
    test("Getting list of employeecertifications with correct data", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
    test("Delete employeecertifications with correct data", async () => {
        let id = 5
        let result = await remove(id);
        expect(result.code).toBe(200);
    });

})