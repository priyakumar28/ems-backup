import { create, update, list, remove } from '../controllers/educations';
describe('testing educations route', () => {
    const testdata = [
        {
            name: "sslc",
            description: "bffdjvbdvjfdbvjfdvbvdvhcbvvb"
        },
        {
            name:"hsc"
        },
        { 
            description:131232132432
        }
    ];
    const testdata1 = [
        {
            name: 12345,
            description: "bffdjvbdvjfdbvjfdvbvdvhcbvvb"
        },
        {
            name: "sslc",
            description: 123324354576
        }
    ]
    test("Create educations with correct data", async () => {
        let result = await create(testdata[0]);
        expect(result.code).toBe(200);
    });
    for (let i of testdata1) {
        test("Create educations with incorrect data", async () => {
            let result = await create(i);
            expect(result.code).toBe(422);
        });
    }
    test("Update educations with correct data", async () => {
        let id = 1;
        let result = await update(testdata[1], id);
        expect(result.code).toBe(200);
    });
    test("Update educations with incorrect data", async () => {
        let id = 3;
        let result = await update(testdata[2], id);
        expect(result.code).toBe(422);
    });
    test("Getting list of educations with correct data", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
    test("Delete educations with correct data", async () => {
        let id = 5
        let result = await remove(id);
        expect(result.code).toBe(200);
    });
})