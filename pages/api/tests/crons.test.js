import { create, update, list, remove } from '../controllers/crons';
describe('testing crons route', () => {
    const testdata = [
        {
            name: "welcome email",
            class: "bfdsjdvdsv",
            lastrun: 22 - 12 - 2022,
            frequency: 123,
            time: "sdfdsfs",
            type: "Minutely",
            status: "Enabled"
        },
        {
            name: "pancard notification email"
        },
        { 
            status:123124
        }
    ]
    const testdata1 = [
        {
            name: 123244,
            class: "bfdsjdvdsv",
            lastrun: 22 - 12 - 2022,
            frequency: 123,
            time: "sdfdsfs",
            type: "Minutely",
            status: "Enabled"
        },
        {
            name: "welcome email",
            class: 23134,
            lastrun: 22 - 12 - 2022,
            frequency: 123,
            time: "sdfdsfs",
            type: "Minutely",
            status: "Enabled"

        },
        {
            name: "welcome email",
            class: "bfdsjdvdsv",
            lastrun: "fwfsdfds",
            frequency: 123,
            time: "sdfdsfs",
            type: "Minutely",
            status: "Enabled"
        },
        {
            name: "welcome email",
            class: "bfdsjdvdsv",
            lastrun: 22 - 12 - 2022,
            frequency: "rewrew",
            time: "sdfdsfs",
            type: "Minutely",
            status: "Enabled"
        }
    ]
    test("Create crons with correct data", async () => {
        let result = await create(testdata[0]);
        (result, "create crons")
        expect(result.code).toBe(200);
    });
    for (let i of testdata1) {
        test("Create crons with incorrect data", async () => {
            let result = await create(i);
            expect(result.code).toBe(422);
        });
    }
    test("Update crons with correct data", async () => {
        let id = 2;
        let result = await update(testdata[1], id);
        expect(result.code).toBe(200);
    });
    test("Update crons with incorrect data", async () => {
        let id = 2;
        let result = await update(testdata[2], id);
        expect(result.code).toBe(422);
    });
    test("Getting list of crons with correct data", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
    test("Delete crons with correct data", async () => {
        let id = 2
        let result = await remove(id);
        expect(result.code).toBe(200);
    });
})