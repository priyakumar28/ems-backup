import { create, update, list, remove } from '../controllers/employerdocuments';
describe('testing of employerdocuments route', () => {
    const testdata = [
        {
            user: 3,
            document: 1,
            name: "vbfdjbfdbf",
            date_added: 23 - 12 - 2022,
            valid_until: 24 - 12 - 2022,
            approval_status: "Approved",
            details: "vschgshcgdshds",
            attachment: "kdkjvbdjvfdbvfdv",
            signature: "shdfbdhgbfd",
            expire_notification_last: 23,
            doc_type: "REX approval forms"
        },
        {
            doc_type: "L1 assessment forms"  
        },
        {
            siganature:1223432
        }
    ];
    const testdata1 = [
        { 
            user: 4,
            document: 2,
            name: 232434,
            date_added: 23 - 12 - 2022,
            valid_until: 24 - 12 - 2022,
            approval_status: "Approved",
            details: "vschgshcgdshds",
            attachment: "kdkjvbdjvfdbvfdv",
            signature: "shdfbdhgbfd",
            expire_notification_last: 23,
            doc_type: "REX approval forms" 
        },
        {
            user: 4,
            document: 2,
            name: "bdshvdsv",
            date_added: 23 - 12 - 2022,
            valid_until: 24 - 12 - 2022,
            approval_status: "Approved",
            details: "vschgshcgdshds",
            attachment: 232432,
            signature: "shdfbdhgbfd",
            expire_notification_last: 23,
            doc_type: "REX approval forms"
        },
        {
            user: 4,
            document: 2,
            name: "bdshvdsv",
            date_added: 23 - 12 - 2022,
            valid_until: 24 - 12 - 2022,
            approval_status: "Approved",
            details: "vschgshcgdshds",
            attachment: 232432,
            signature: "shdfbdhgbfd",
            expire_notification_last: 23,
            doc_type: 43565
        }
    ]
    test("Create employerdocuments with correct data", async () => {
        let result = await create(testdata[0]);
        (result, "create employerdocuments")
        expect(result.code).toBe(200);
    });
    for (let i of testdata1) {
        test("Create employerdocuments with incorrect data", async () => {
            let result = await create(i);
            expect(result.code).toBe(422);
        });
    }
    test("Update employerdocuments with correct data", async () => {
        let id = 2;
        let usrr = { id: 2, email: "keerthana@bassure.com" }
        let result = await update(testdata[1], id, usrr);
        expect(result.code).toBe(200);
    });
    test("Update employerdocuments with incorrect data", async () => {
        let id = 1;
        let usrr = { id: 2, email: "keerthana@bassure.com" }
        let result = await update(testdata[2], id, usrr);
        expect(result.code).toBe(422);
    });
    test("Getting list of employerdcuments with correct data", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
    test("Delete employerdocuments with correct data", async () => {
        let id = 3
        let result = await remove(id);
        expect(result.code).toBe(200);
    });

})