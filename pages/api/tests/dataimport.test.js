import { update, create, list, remove } from '../controllers/dataimport';
describe('testing dataimport route', () => {
    const testData = [
        {
            name: "vinay",
            datatype: "int",
            details: "22-5555/netajipeta",
            columns: "one by on ok",
            updated: "2/04/2010",
            created: "2-12-2011",
        },
        {
            name: "eghjghgfd",
            datatype: "int",
            details: "string",
            columns: "one by on ok",
            updated: "2/04/2010",
            created: "2-12-2011",
        },
        {
            name: "vinay krishna",
            datatype: "int",
            details: "string",
            columns: "one by on ok",
            updated: "2/04/2010",
            created: "2-12-2011",
        }
    ];

    
    test("Create dataimport with correct data", async () => {
        let result = await create(testData[0]);
        expect(result.code).toBe(200);
    });
    test("Create dataimport with correct data", async () => {
        let result = await create(testData[1]);
        expect(result.code).toBe(422);
    });
    
    test("Update dataimport with correct data", async () => {
        let id = 5;
        let result = await update(testData[2], id);
        expect(result.code).toBe(200);
    });
    test("Getting list of dataimport with correct data", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
    test("Delete dataimport with correct data", async () => {
        let id = 2
        let result = await remove(id);
        expect(result.code).toBe(200);
    });
});
