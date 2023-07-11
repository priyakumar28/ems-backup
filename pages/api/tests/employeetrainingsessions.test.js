import { create, update, remove, list, getById } from '../controllers/employeetrainingsessions';
describe('Testing employee_trainingsession route', () => {
    const testData = [
        {
            employee: 42,
            trainingsession: 19,
            status: "Not-Attended",//"Scheduled", "Attended", "Not-Attended", "Completed"
            feedback: "Trainingsession assigned to employee"
        },
        {
            employee: 42,
            trainingsession: 20,
            status: "Scheduled",
            feedback: "Trainingsession assigned to employee",

        },
        {
            employee: 42,
            trainingsession: "jdjjd",
            status: "Not-Attended",
            feedback: "Trainingsession assigned to employee",

        }
    ];
let permission = {
    "View training sessions": true,
    "View employees":true
    }

    //success cases:

    // test("Create new employee_trainingsession", async () => {
    //     let result = await create(testData[0]);
    //     expect(result.code).toBe(200);

    // });

    // test("Update employee_trainingsession", async () => {
    //     let id = 5;
    //     let result = await update(testData[1], id);
    //     expect(result.code).toBe(200);
    // });

    test("Showing list of employee_trainingsessions", async () => {
        let result = await list(permission);
        expect(result.code).toBe(200);
    });

//     test("get employee_trainingsession by id", async () => {
//         let id = 2;
//         let result = await getById(id,permission);
//         expect(result.code).toBe(200);
//    });

    // test("Delete employee_trainingsession", async () => {
    //     let id = 4;
    //     let result = await remove(id);
    // });


    // //validation Error cases:

    // test("Create new employee_trainingsession", async () => {
    //     let result = await create(testData[2]);
    //     expect(result.code).toBe(422);
    // });

    // test("Update employee_trainingsession", async () => {
    //     let id = 8;
    //     let result = await update(testData[2], id);
    //     expect(result.code).toBe(422);
    // });


    // //Invalid Request cases:

    // test("Update employee_trainingsession with wrong id", async () => {
    //     let id = 10000;
    //     let result = await update(testData[1], id);
    //     expect(result.code).toBe(400);
    // });

    // test("get employee_trainingsession with wrong id", async () => {
    //     let id = 8888888;
    //     let result = await getById(id);
    //     expect(result.code).toBe(400);
    // });

    // test("Delete employee_trainingsession with wrong id", async () => {
    //     let id = 1101;
    //     let result = await remove(id);
    //     expect(result.code).toBe(400);
    // });

})