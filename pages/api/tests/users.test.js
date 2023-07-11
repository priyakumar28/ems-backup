import { create, update, list, remove } from '../controllers/users';
describe('testing users route', () => {
    const testData = [
        {
            username: "keerthana",
            email: "haripriya@bassure.com",
                employee: 1,
                user_level: "Admin",
          default_module: 42,
          user_roles: 1,
          profile_pic: "iwkwms,wmslwo",
          last_login: "12-22-2022",
          last_update:"12-22-2022",
          created:"12-22-2022",
          login_hash:"duwyuwiuiwi",
          lang: 1
        },
       
    ];
    const testdata1 = [
        {
            name: "keerthwwwwwwwwwwwwwwwwwwwwwwwwdnwmxwwwwwwwwwwwwwwwwwwwwwwwwdnwmxana",
            class: "fghjhgfghhgh",
            lastrun: 99 - 12 - 2022,
            frequency: 42,
            time: "12:22",
            type: "Minutkdjkely",
            status: "Enajsbled",
        },
        {
            name: "iowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwdnwmxasskkkkkkkkkkkkkkk,,,,,,,,,,,,,,,,,,woia",
            class: "fghjhgfghhgh",
            lastrun: 32- 12 - 2022,
            frequency: 4002,
            time: "12:22",
            type: "Minutely",
            status: "Enabled",
        },
        {
            name: "opwwwwwwwwwwwwwwwwwwwwwwdlsakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkalmc,zana",
            class: "fghjhgfdddddddddghhgh",
            lastrun: 22 - 12 - 2022,
            frequency: 42,
            time: "12:22",
            type: "Minutel3edy",
            status: "Enabled",
        },
        
    ];
    test("Create users with correct data", async () => {
        let result = await create(testData[0]);
        expect(result.code).toBe(200);
    });
    for (let i of testdata1) {
        test("Create users with incorrect data", async () => {
            let result = await create(i);
            expect(result.code).toBe(422);
        });
    }
    test("Update users with correct data", async () => {
        let id = 1;
        let usrr = {id:2,email: "keerthana@bassure.com"}
        let result = await update(testData[1], id,usrr);
        expect(result.code).toBe(200);
    });
    test("Update users with incorrect data", async () => {
        let id = 5;
        let usrr = { id: 2, email: "keerthana@bassure.com" }
        let result = await update(testdata1[2], id, usrr);
        expect(result.code).toBe(422);
    });
    test("Getting list of users with correct data", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
    test("Delete users with correct data", async () => {
        let id = 1
        let result = await remove(id);
        expect(result.code).toBe(200);
    });
})