import { update, create, list, remove, getById } from '../controllers/projects';
describe('Testing project route', () => {
    const testData = [
        {
            name: "Foodie",
            client: 2,
            details: "Its a new project",
            start_date: "2020-07-22",
            end_date: "2020-07-30",
            status: "Active"

        },
        {
            name: "Train",
            client: 2,
            details: "Its a new project",
            start_date: "12-12-2024",
            end_date: "12-12-2022",
            status: "Active"
        },
        {
            name: "Traffic",
            client: 2,
            details: "Its a new project",
            start_date: "2020-07-22",
            end_date: "2020-07-30",
            status: "Active"

        }
    ];
   
   
    //success cases:

    test("Create new project", async () => {
        let result = await create(testData[0]);
        (result, "create project");
        expect(result.code).toBe(200);

    });
    test("Update project", async () => {
        let id = 2;
        let result = await update(testData[2], id);
        expect(result.code).toBe(200);
    });
    test("Showing list of projects", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
    test("Delete project", async () => {
        let id = 4;
        let result = await remove(id);
    });


    //validation Error cases:

    test("Create new project", async () => {
        let result = await create(testData[1]);
        expect(result.code).toBe(422);

    });
    test("Update project", async () => {
        let id = 8;
        let result = await update(testData[1], id);
        expect(result.code).toBe(422);
    });
    test("Delete project", async () => {
        let id = 4;
        let result = await remove(id);
        expect(result.code).toBe(422);
    });
    
    
    //Invalid Request cases:

    test("Update project with wrong id", async () => {
        let id = 10000;
        let result = await update(testData[0], id);
        expect(result.code).toBe(500);
    });
   
    test("get project with wrong id", async () => {
        let id = 8888888;
        let result = await getById(id);
        expect(result.code).toBe(400);
    });

    test("Delete project with wrong id", async () => {
        let id = 110;
        let result = await remove(id);
        expect(result.code).toBe(400);
    });
});