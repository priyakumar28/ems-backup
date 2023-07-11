import { create, update, list, remove } from '../controllers/certifications';
describe('testting certifications route', () => {
    const testdata = [
        {
            name: "java certified",
            description: "dhbvfduvhfdvhdjfgdeuhfdvfd"
        },
        {
            name: "node js"
        },
        {
            description: 12232
        }
    ];
    const testdata1 = [
        {
            name: 21321,
            description: "vbdjvhfdvufdvfd"
        },
        {
            name: "wbfjdffdvfd",
            description: 232432
        }
    ]
    test("Create certifications with correct data", async () => {
        let result = await create(testdata[0]);
        expect(result.code).toBe(200);
    });
    for (let i of testdata1) {
        test("Create certifications with incorrect data", async () => {
            let result = await create(i);
            expect(result.code).toBe(422);
        });
    }
    test("Update certifications with correct data", async () => {
        let id = 1;
        let result = await update(testdata[1], id);
        expect(result.code).toBe(200);
    });
    test("Update certifications with incorrect data", async () => {
        let id = 3;
        let result = await update(testdata[2], id);
        expect(result.code).toBe(422);
    });
    test("Getting list of certifications with correct data", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
    test("Delete certifications with correct data", async () => {
        let id = 5
        let result = await remove(id);
        expect(result.code).toBe(200);
    });
})