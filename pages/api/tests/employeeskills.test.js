import { create, update, list, remove } from '../controllers/employeeskills';
describe('testing employeeskills route', () => {
    const testdata = [
        {
            skill_id: 2,
            skill_name: "sfsdgfdshfgdsfh",
            is_certified: "Yes",
            attachment: "dshfbdsfdv",
            employee: 9,
            date_start: 23 - 11 - 2022,
            date_end: 24 - 12 - 2022,
            details: "dvjdsfbdsfd"
        },
        {
            
            skill_id: 4,
            skill_name: "sfsdgfdshfgdsfh",
            is_certified: "Yes",
            attachment: "dshfbdsfdv",
            employee: 13,
            date_start: 23 - 11 - 2022,
            date_end: 24 - 12 - 2022,
            details: "dvjdsfbdsfd"
        },
        { 
            is_certified:"No"
        },
        { 
            details:123324
        }
    ];
    const testdata1 = [
        {

            skill_id: 5,
            skill_name: "sfsdgfdshfgdsfh",
            is_certified: "Yes",
            attachment: "dshfbdsfdv",
            employee: 10,
            date_start: 23 - 11 - 2022,
            date_end: 24 - 12 - 2022,
            details: "dvjdsfbdsfd"
        },
        {

            skill_id: 5,
            skill_name: "sfsdgfdshfgdsfh",
            is_certified: "Yes",
            attachment: "dshfbdsfdv",
            employee: 11,
            date_start: 23 - 11 - 2022,
            date_end: 24 - 12 - 2022,
            details: "dvjdsfbdsfd"
        },
        {

            skill_id: 4,
            skill_name: "sfsdgfdshfgdsfh",
            is_certified: "Yes",
            attachment: "dshfbdsfdv",
            employee: 11,
            date_start: 23 - 11 - 2022,
            date_end: 24 - 12 - 2022,
            details: "dvjdsfbdsfd"
        }
        
    ]
    test("Create employeeskills with correct data", async () => {
        let result = await create(testdata[0]);
        expect(result.code).toBe(200);
    });
    for (let i of testdata1) {
        test("Create employeeskills with incorrect data", async () => {
            let result = await create(i);
            expect(result.code).toBe(422);
        });
    }
    test("Update employeeskills with correct data", async () => {
        let id = 1;
        let result = await update(testdata[2], id);
        expect(result.code).toBe(200);
    });
    test("Update employeeskills with incorrect data", async () => {
        let id = 3;
        let result = await update(testdata[3], id);
        expect(result.code).toBe(422);
    });
    test("Getting list of employeeskills with correct data", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
    test("Delete employeeskills with correct data", async () => {
        let id = 5
        let result = await remove(id);
        expect(result.code).toBe(200);
    });
 })