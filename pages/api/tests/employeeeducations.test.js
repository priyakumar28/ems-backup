import { update, create, list, remove, getById } from '../controllers/employeeeducations';
describe('Testing employee_educations route', () => {
    const testData = [
        {
            education_name: "Msc",
            employee: 6,
            institute: "Bassure Educations",
            date_start:"12-06-2000",
            date_end:"12-06-2002"

        },
        {
            education_name: "Msc",
            employee: 6,
            institute: "Govt institution",
            date_start: "12-06-2000",
            date_end: "12-06-2002"

        },
        {
            education_name: "Msc",
            employee: 6,
            institute: 74839,
            date_start: "13-13-2000",
            date_end: "12-06-2002"

        }
    ];


    //success cases:

    // test("Create new employee_education", async () => {
    //     let result = await create(testData[0]);
    //     expect(result.code).toBe(200);

    // });

    // test("Update employee_education", async () => {
    //     let id = 9;
    //     let result = await update(testData[1], id);
    //     expect(result.code).toBe(200);
    // });

    // test("Showing list of employee_educations", async () => {
    //     let result = await list();
    //     expect(result.code).toBe(200);
    // });

    // test("get employee_educations", async () => {
    //     let id = 9;
    //     let result = await getById(id);
    //     expect(result.code).toBe(200);
    // });

    // test("Delete employee_educations", async () => {
    //     let id = 5;
    //     let result = await remove(id);
    // });


    //validation Error cases:

    // test("Create new employee_educations", async () => {
    //     let result = await create(testData[2]);
    //     expect(result.code).toBe(422);
    // });
    
    // test("Update employee_educations", async () => {
    //     let id = 9;
    //     let result = await update(testData[2], id);
    //     expect(result.code).toBe(422);
    // });



    // //Invalid Request cases:

    test("Update employee_educations with wrong id", async () => {
        let id = 10000;
        let result = await update(testData[0], id);
        expect(result.code).toBe(400);
    });

    test("get employee_educations with wrong id", async () => {
        let id = 8888888;
        let result = await getById(id);
        expect(result.code).toBe(400);
    });

    test("Delete employee_educations with wrong id", async () => {
        let id = 1101;
        let result = await remove(id);
        expect(result.code).toBe(400);
    });

})