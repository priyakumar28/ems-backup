import { update, create, list, remove ,getById} from '../controllers/trainingsessions';


describe('Testing trainingsession route', () => {
    const testData = [
        {
            name: "COBAL",
            course: 4,
            description: "Its a new trainingsession",
            scheduled: "2020-07-22",
            duedate: "2020-07-30",
            deliverymethod: "Online",//Classroom,Self Study,Online
            status: "Pending", ////Approved,Completed,Cancelled,Pending

        },
        {
            name:"Artificial Intelligence",
            course: 5,
            description: "Its a new trainingsession",
            scheduled: "2020-07-22",
            duedate: "2020-07-30",
            deliverymethod: "Online",//Classroom,Self Study,Online
            status: "Something", ////Approved,Completed,Cancelled,Pending

        },
        {
            name: "VB.Net",
            course: 6,
            description: "Its a new trainingsession",
            scheduled: "2020-07-22",
            duedate: "2020-07-30",
            deliverymethod: "Online",//Classroom,Self Study,Online
            status: "Pending", ////Approved,Completed,Cancelled,Pending


        }
    ];

    let permission = {
        "View Courses":true
    }

    //success cases:

    // test("Create new trainingsession", async () => {
    //     let result = await create(testData[0]);
    //     expect(result.code).toBe(200);

    // });
    
    // test("Update trainingsession", async () => {
    //     let id = 20;
    //     let result = await update(testData[2], id);
    //     expect(result.code).toBe(200);
    // });

    // test("Showing list of trainingsessions", async () => {
    //     let result = await list(permission);
    //     expect(result.code).toBe(200);
    // });

    test("get trainingsession", async () => {
        let id = 11;
        let result = await getById(id,permission);
        expect(result.code).toBe(200);
    });

    // test("Delete trainingsession", async () => {
    //     let id = 13;
    //     let result = await remove(id);
    // });


    // //validation Error cases:

    // test("Create new trainingsession", async () => {
    //     let result = await create(testData[1]);
    //     expect(result.code).toBe(422);

    // });
    // test("Update trainingsession", async () => {
    //     let id = 8;
    //     let result = await update(testData[1], id);
    //     expect(result.code).toBe(422);
    // });
   


    // //Invalid Request cases:

    // test("Update trainingsession with wrong id", async () => {
    //     let id = 10000;
    //     let result = await update(testData[0], id);
    //     expect(result.code).toBe(400);
    // });

    // test("get trainingsession with wrong id", async () => {
    //     let id = 8888888;
    //     let result = await getById(id);
    //     expect(result.code).toBe(400);
    // });

    // test("Delete trainingsession with wrong id", async () => {
    //     let id = 1101;
    //     let result = await remove(id);
    //     expect(result.code).toBe(400);
    // });

})