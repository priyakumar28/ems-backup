import { update, create, list, remove } from '../controllers/users/modules';
describe('Testing modules route', () => {
    const testData = [
        {
            menu: "new",
            name:"my module",
            label: "something",
            icon:"new",
            mod_group: "special group",
            mod_order: 1,
            status:"Enabled",
            user_levels: "supervisor",
            user_roles:"techsupport"

        },
        {
            menu: "staff management",
            name: "adding staff",
            label: "something",
            icon: "new",
            mod_group: "special group",
            mod_order: 1,
            status: "Enabled",
            user_levels: "supervisor",
            user_roles: "techsupport"
        },
        {
            menu: "Security management",
            name: 12345678,
            label: "something",
            icon: "new",
            mod_group: "special group",
            mod_order: 1,
            status: "Disabled",
            user_levels: "supervisor",
            user_roles: "techsupport"

        }
    ];


    //success cases:

    test("Create new modules", async () => {
        let result = await create(testData[0]);
        expect(result.code).toBe(200);

     });
    test("Update modules", async () => {
        let id = 195;
        let result = await update(testData[1], id);
        expect(result.code).toBe(200);
    });
    test("Showing list of modules", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
    test("Delete modules", async () => {
        let id = 193;
        let result = await remove(id);
    });


    //validation Error cases:

    test("Create new modules", async () => {
        let result = await create(testData[2]);
        expect(result.code).toBe(422);
    });

    test("Update modules", async () => {
        let id = 194;
        let result = await update(testData[2], id);
        expect(result.code).toBe(422);
    });
    


     //Invalid Request cases:

    test("Update modules with wrong id", async () => {
        let id = 10000;
        let result = await update(testData[0], id);
        expect(result.code).toBe(404);
    });

    test("Delete modules with wrong id", async () => {
        let id = 110;
        let result = await remove(id);
        expect(result.code).toBe(404);
    });
});