import { create, update, list, remove } from '../controllers/emergencycontacts';
describe('testing emergency contacts route', () => {
    const testdata = [
        {
            employee: 9,
            name: "sadhasivam",
            relationship: "father",
            home_phone: "234565432324",
            work_phone: "234565432324",
            mobile_phone:"2312321321321"
        },
        {
            employee:13,
        },
        {
            work_phone:"23425365767856343234665346456"
        }
    ]
    const testdata1 = [
        {
            employee: 9,
            name: 12323432,
            relationship: "father",
            home_phone: "234565432324",
            work_phone: "234565432324",
            mobile_phone: "2312321321321"
        },
        {
            employee: 9,
            name: "sadhasivam",
            relationship: 1234532,
            home_phone: "234565432324",
            work_phone: "234565432324",
            mobile_phone: "2312321321321"
        },
        { 
            employee: 9,
            name: "sadhasivam",
            relationship: "father",
            home_phone: "234565432324",
            work_phone: "234565432324",
            mobile_phone: "231232132132113142432"
        }
    ]
    test("Create emergencycontacts with correct data", async () => {
        let usrr = { id: 2, email: "keerthana@bassure.com" }
        let result = await create(testdata[0], usrr);
        expect(result.code).toBe(200);
    });
    for (let i of testdata1) {
        test("Create emergencycontacts with incorrect data", async () => {
            let result = await create(i);
            expect(result.code).toBe(422);
        });
    }
    test("Update emergencycontacts with correct data", async () => {
        let id = 1;
        let usrr = { id: 2, email: "keerthana@bassure.com" }
        let result = await update(testdata[1], id, usrr);
        expect(result.code).toBe(200);
    });
    test("Update emergencycontacts with incorrect data", async () => {
        let id = 2;
        let usrr = { id: 2, email: "keerthana@bassure.com" }
        let result = await update(testdata[2], id, usrr);
        expect(result.code).toBe(422);
    });
    test("Getting list of emergencycontacts with correct data", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
    test("Delete emergencycontacts with correct data", async () => {
        let id = 2
        let result = await remove(id);
        expect(result.code).toBe(200);
    });

})
