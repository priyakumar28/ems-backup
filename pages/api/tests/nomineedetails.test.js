import { create,remove,update,list,getById } from '../controllers/nomineedetails';


describe('testing nomineedetails route', () => {
    
    const testData = [
        {
            name: "lalitha",
            employee: "2",
            state: "AP",
            district: "KNL",
            address_pincode: "KKL",
            phone: "8988765678",
            relationship: "Grandfather"
        },
        {
            name: "lalitha",
            employee: "2",
            state: "AP",
            district: "KNL",
            address_pincode: "KKL",
            phone: "8988765678",
            relationship: "Sister"
        },
        {
            name: "lalitha",
            employee: "2",
            state: "AP",
            district: "KNL",
            address_pincode: "KKL",
            phone: "SMSssss",
            relationship: "Uncle"
        }

    ];

    test("GetbyId of nomineedetails", async () => {
        let id = 21;
        let result = await getById(id);
        expect(result.code).toBe(200);
    });


    test("Create nomineedetails with correct data", async () => {
        let result = await create(testData[0]);
        expect(result.code).toBe(200);
    });

    test("Update nomineedetails with correct data", async () => {
        let id = 4;
        let result = await update(testData[0],id);
        expect(result.code).toBe(200);
    });

    test("Delete nomineedetails with correct data", async () => {
        let id = 15;
        let result = await remove(id);
        expect(result.code).toBe(200);
    });

    test("List of nomineedetails", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });

// when giving wrong data (422, 500)........
    
    test("GetbyId of nomineedetails", async () => {
        let id = 101;
        let result = await getById(id);
        expect(result.code).toBe(400);
    });

    test("Delete nomineedetails with wrong data", async () => {
        let id = 105;
        let result = await remove(id);
        expect(result.code).toBe(400);
    });

    test("Update nomineedetails with wrong data", async () => {
        let id = 107;
        let result = await update(testData[0],id);
        expect(result.code).toBe(400);
    });

    test("Update nomineedetails with wrong data", async () => {
        let id = 3;
        let result = await update(testData[1],id);
        expect(result.code).toBe(422);
    });

    test("Create nomineedetails with correct data", async () => {
        let result = await create(testData[2]);
        expect(result.code).toBe(422);
    });




});