import { create, update, list, remove } from '../controllers/employementtype';
describe('testing employmenttype route', () => {
    const testdata = [
        { name: "dhcbdsvfd" },
        { name: "asddsddd" },
        { name: "keerthana" },
        { name:122423}
        
    ]
    const testdata1 = [
        { name: 12242 }
    ]
    test("Create employmenttype with correct data", async () => {
        let result = await create(testdata[0]);
        expect(result.code).toBe(200);
    });
    
        test("Create employmenttype with incorrect data", async () => {
            let result = await create(testdata1[0]);
            expect(result.code).toBe(422);
        });
    
    test("Update employmenttype with correct data", async () => {
        let id = 1;
        let result = await update(testdata[2], id);
        expect(result.code).toBe(200);
    });
    test("Update employmenttype with incorrect data", async () => {
        let id = 3;
        let result = await update(testdata[3], id);
        expect(result.code).toBe(422);
    });
    test("Getting list of employmenttype with correct data", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
    test("Delete employmenttype with correct data", async () => {
        let id = 5
        let result = await remove(id);
        expect(result.code).toBe(200);
    });
})