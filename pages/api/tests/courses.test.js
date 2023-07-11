import { create, update, list, remove } from '../controllers/courses';

describe('testing courses route', () => {
    
    const testdata = [
        {
            code: "1243adsaf",
            name: "python",
            description: "vdbvhfdfdhgfdgfdnvndjvhfdfddd",
            coordinator: 14,
            trainer: "kannan",
            trainer_info: "dhfscvhxgsjfghhkskk",
            paymenttype: "Company Sponsored",
            currency: "12",
            cost: 230000.23,
            status: "Active"
            
        },
        {
            code: "1243346",
            name: "nodejs",
            description: "vdbvhfdfdhgfdgfd",
            coordinator: 14,
            trainer: "kannan",
            trainer_info: "dhfscvhxgsjfghhkskk",
            paymenttype: "Company Sponsored",
            currency: "12",
            cost: 230000.23,
            status: "Active"
            
        },
        { 
            code: "1243adsaf",
            name: "nodejs",
            status:"Active",
            description: "Itbegrgbrvfbfnbf"
        },
        {
            description:12324324
        }
    ];
    const testdata1 = [
        {
            code: "1243adsaf",
            name: 12233,
            description: "vdbvhfdfdhgfdgfdnvndjvhfdfddd",
            coordinator: 14,
            trainer: "kannan",
            trainer_info: "dhfscvhxgsjfghhkskk",
            paymenttype: "Company Sponsored",
            currency: "12",
            cost: 230000.23,
            status: "Active"

        },
        {
            code: "1243adsaf",
            name: "node",
            description: "vdbvhfdfdhgfdgfdnvndjvhfdfddd",
            coordinator: 14,
            trainer: 12344354,
            trainer_info: "dhfscvhxgsjfghhkskk",
            paymenttype: "Company Sponsored",
            currency: "12",
            cost: 230000.23,
            status: "Active"

        },
        {
            code: 12345,
            name: "cgggfhg",
            description: "vdbvhfdfdhgfdgfdnvndjvhfdfddd",
            coordinator: 14,
            trainer: "kannan",
            trainer_info: "dhfscvhxgsjfghhkskk",
            paymenttype: "Company Sponsored",
            currency: "12",
            cost: 230000.23,
            status: "Inactive"

        },
    ];
    test("Create courses with correct data", async () => {
        let usrr = { id: 2, email: "keerthana@bassure.com" }
        let result = await create(testdata[0],usrr);
        expect(result.code).toBe(200);
    });
    for (let i of testdata1) {
        test("Create courses with incorrect data", async () => {
            let result = await create(i);
            expect(result.code).toBe(422);
        });
    }
    test("Update courses with correct data", async () => {
        let id = 4;
        let usrr = { id: 2, email: "keerthana@bassure.com" }
        let result = await update(testdata[2], id, usrr);
        expect(result.code).toBe(200);
    });
    test("Update courses with incorrect data", async () => {
        let id = 5;
        let usrr = { id: 2, email: "keerthana@bassure.com" }
        let result = await update(testdata[3], id, usrr);
        expect(result.code).toBe(422);
    });
    test("Getting list of courses with correct data", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
    test("Delete courses with correct data", async () => {
        let id = 17
        let result = await remove(id);
        expect(result.code).toBe(200);
    });



})