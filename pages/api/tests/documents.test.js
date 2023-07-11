import { create, update, list, remove } from '../controllers/documents';
describe('testing documents route', () => {
    const testdata = [{
        
            name: "pancard",
            details: "xvbcvcbjcbnc mvcjnb b v",
            expire_notification: "Yes",
            expire_notification_month: "Yes",
            expire_notification_week: "Yes",
            expire_notification_day: "Yes",
            sign: "Yes",
            sign_label: "vjvdjv",
        
    },
        {
            name: "transfer certificate",
            details: "xvbcvcbjcbnc mvcjnb b v",
            expire_notification: "Yes",
            expire_notification_month: "Yes",
            expire_notification_week: "Yes",
            expire_notification_day: "Yes",
            sign: "Yes",
            sign_label: "vjvdjv",
        },
        {
            details:"dbvfdkjvfdjvfvfdv"
        },
        {
            name: 32424324,
            sign_label:"dfvbdvdv"
        }
    ];
    const testdata1 = [{ fields: 
        {
        name: 122243232,
        details: "xvbcvcbjcbnc mvcjnb b v",
        expire_notification: "Yes",
        expire_notification_month: "Yes",
        expire_notification_week: "Yes",
        expire_notification_day: "Yes",
        sign: "Yes",
        sign_label: "vjvdjv",
    }},
        {
            fields: {
                name: "pancard",
                details: 123124,
                expire_notification: "Yes",
                expire_notification_month: "Yes",
                expire_notification_week: "Yes",
                expire_notification_day: "Yes",
                sign: "Yes",
                sign_label: "vjvdjv",
            }
        },
        {
            fields: {
                name: "pancard",
                details: "xvbcvcbjcbnc mvcjnb b v",
                expire_notification: "Yes",
                expire_notification_month: "Yes",
                expire_notification_week: "Yes",
                expire_notification_day: 232132,
                sign: "Yes",
                sign_label: "dnvfuvfdv",
            }
        }
    
    ]

    test("Create documents with correct data", async () => {
        let usrr = { id: 2, email: "keerthana@bassure.com" }
        let result = await create(testdata[0], usrr);
        (result, "create documents")
        expect(result.code).toBe(200);
    });
    for (let i of testdata1) {
        test("Create documents with incorrect data", async () => {
            let usrr = { id: 2, email: "keerthana@bassure.com" }
            let result = await create(i,usrr);
            expect(result.code).toBe(422);
        });
    }
    test("Update documents with correct data", async () => {
        let id = 4;
        let usrr = { id: 2, email: "keerthana@bassure.com" }
        let result = await update(testdata[2], id, usrr);
        expect(result.code).toBe(200);
    });
    test("Update documents with incorrect data", async () => {
        let id = 5;
        // let usrr = { id: 2, email: "keerthana@bassure.com" }
        let result = await update(testdata[3], id );
        expect(result.code).toBe(422);
    });
    test("Getting list of documents with correct data", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
    test("Delete documents with correct data", async () => {
        let id = 6
        let result = await remove(id);
        expect(result.code).toBe(200);
    });


})