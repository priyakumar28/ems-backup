import { create, update, list, remove } from '../controllers/skills';
describe('testing skills route', () => {
    const testdata = [
        {
            name: "fdhdfdfd",
            description: "dfbdjhfdughfdjdkvhfdfj"
        },
        { 
            name:"javawerw"
        },
        {
            description:"cbdvfdbvdvdvfd"
        }
    ];
    const testdata1 = [
        {
            name: 1232432435,
            description: "dfbdjhfdughfdjdkvhfd"
        },
        {
            name: "fdhdfdfd",
            description: 3232421
        }
    ]
    test("Create skills with correct data", async () => {
        let result = await create(testdata[0]);
        expect(result.code).toBe(200);
    });
    for (let i of testdata1) {
        test("Create skills with incorrect data", async () => {
            let result = await create(i);
            expect(result.code).toBe(422);
        });
    }
    test("Update skills with correct data", async () => {
        let id = 2;
        let result = await update(testdata[1], id);
        expect(result.code).toBe(200);
    });
    test("Update skills with incorrect data", async () => {
        let id = 2;
        let result = await update(testdata[2], id);
        expect(result.code).toBe(422);
    });
    test("Getting list of skills with correct data", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
    test("Delete skills with correct data", async () => {
        let id = 1
        let result = await remove(id);
        expect(result.code).toBe(200);
    });
})