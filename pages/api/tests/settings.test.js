import { create, update, list, remove } from '../controllers/settings';
describe('testing settings route', () => {
    const testData = [
        {
            name: "keerthana",
            value: "fghjhgfghhgh",
            description: "jshdie",
            meta:"idie",
            
        },
        { 
            name: "haru87@ddd",
        },
        { 
            name: "siva@@@#!",
            value: "fghjhgfghhgh",
            description: "jshdie",
            meta:"idie",
            
        }
    ];
    const testdata1 = [
        {
            name: "keerthanayeuwiqopqeewowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwweirkedj",
            value: "fghjhgfghhgh",
            description: "jshdie",
            meta:"idie",
        },
        {
            name: "keerthanaldko23i2ir9999999999999999999999",
            value: 374798214,
            description: "jshdie",
            meta:"idie",
        },
        {
            name: 983084444444,
            value: "fghjhgfghhgh",
            description: "jshdie",
            meta:"idie",
        },
        {
            name: "ieuiq!@^&*",
            value: "fghjhgfghhgh",
            description: "jshdie",
            meta:"idie",
        },
    ];
   
    test("Update settings with correct data", async () => {
        let id = 1;
        let usrr = {id:2,email: "keerthana@bassure.com"}
        let result = await update(testData[1], id,usrr);
        expect(result.code).toBe(200);
    });
    test("Update settings with incorrect data", async () => {
        let id = 5;
        let usrr = { id: 2, email: "keerthana@bassure.com" }
        let result = await update(testData[2], id, usrr);
        expect(result.code).toBe(422);
    });
    test("Getting list of settings with correct data", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
   
})